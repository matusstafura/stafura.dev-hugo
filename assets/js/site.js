(function () {
  "use strict";

  // Theme toggle. The initial class is set by an inline script in <head>
  // so there is no flash; this only handles the click.
  document.addEventListener("click", function (e) {
    var toggle = e.target.closest("[data-theme-toggle]");
    if (!toggle) return;
    var dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (err) {}
  });

  // <details data-dropdown> (language + mobile menu): native open/close,
  // plus close on outside click and on Escape.
  function closeDropdowns(except) {
    var open = document.querySelectorAll("details[data-dropdown][open]");
    for (var i = 0; i < open.length; i++) {
      if (open[i] !== except) open[i].removeAttribute("open");
    }
  }
  document.addEventListener("click", function (e) {
    closeDropdowns(e.target.closest("details[data-dropdown]"));
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDropdowns(null);
  });

  // Cookie consent
  var CONSENT_KEY = "cookie_consent";
  var consent = null;
  try {
    consent = localStorage.getItem(CONSENT_KEY);
  } catch (err) {}

  function loadGTM() {
    var gtmId = window.__GTM_ID;
    if (!gtmId || window.__gtmLoaded) return;
    window.__gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = document.getElementsByTagName("script")[0];
    var j = document.createElement("script");
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + gtmId;
    f.parentNode.insertBefore(j, f);
  }

  function showBanner() {
    var lang = document.documentElement.lang === "de" ? "de" : "en";
    var text = {
      en: {
        message: 'This site uses cookies for analytics. Read the <a class="link" href="https://stafura.dev/cookies/">cookie policy</a>.',
        reject: "Reject",
        accept: "Accept"
      },
      de: {
        // The linked policy page itself is English-only for now (a legal
        // document, so it is not machine translated without review); this
        // points at the canonical English URL rather than a missing page.
        message: 'Diese Website verwendet Cookies für Analysezwecke. Lies die <a class="link" href="https://stafura.dev/cookies/">Cookie-Richtlinie</a> (auf Englisch).',
        reject: "Ablehnen",
        accept: "Annehmen"
      }
    }[lang];

    var banner = document.createElement("div");
    banner.className = "consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      "<p>" + text.message + "</p>" +
      '<div class="consent-actions">' +
      '<button type="button" class="btn btn-outline" data-action="reject">' + text.reject + "</button>" +
      '<button type="button" class="btn" data-action="accept">' + text.accept + "</button>" +
      "</div>";
    document.body.appendChild(banner);
    banner.addEventListener("click", function (e) {
      var action = e.target.getAttribute("data-action");
      if (!action) return;
      var granted = action === "accept";
      try {
        localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
      } catch (err) {}
      banner.remove();
      if (granted) loadGTM();
    });
  }

  if (consent === "granted") {
    loadGTM();
  } else if (consent !== "denied") {
    showBanner(); // script is deferred, so the DOM is already parsed
  }
})();
