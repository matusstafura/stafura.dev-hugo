(function () {
  "use strict";
  var CONSENT_KEY = "cookie_consent";
  var consent = localStorage.getItem(CONSENT_KEY);

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
        message: 'This site uses cookies for analytics. Read the <a href="https://stafura.dev/cookies/">cookie policy</a>.',
        reject: "Reject",
        accept: "Accept"
      },
      de: {
        // The linked policy page itself is English-only for now (a legal
        // document — machine translation isn't used for it without
        // review), so this points to the canonical English URL even on
        // the German site rather than a page that doesn't exist.
        message: 'Diese Website verwendet Cookies für Analysezwecke. Lies die <a href="https://stafura.dev/cookies/">Cookie-Richtlinie</a> (auf Englisch).',
        reject: "Ablehnen",
        accept: "Annehmen"
      }
    }[lang];

    var banner = document.createElement("div");
    banner.id = "cookie-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      "<p>" + text.message + "</p>" +
      '<div class="cookie-consent-actions">' +
      '<button type="button" data-action="reject">' + text.reject + "</button>" +
      '<button type="button" data-action="accept">' + text.accept + "</button>" +
      "</div>";
    document.body.appendChild(banner);
    banner.addEventListener("click", function (e) {
      var action = e.target.getAttribute("data-action");
      if (!action) return;
      var granted = action === "accept";
      localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
      banner.remove();
      if (granted) loadGTM();
    });
  }

  if (consent === "granted") {
    loadGTM();
  } else if (consent !== "denied") {
    document.addEventListener("DOMContentLoaded", showBanner);
  }
})();

(function () {
  "use strict";
  // Close the language <details> dropdown when clicking outside it.
  // Native <details> handles open/close and keyboard/screen-reader
  // support on its own; this only adds the "click elsewhere closes it"
  // behavior that <details> doesn't provide out of the box.
  document.addEventListener("click", function (e) {
    var openDropdowns = document.querySelectorAll(".lang-dropdown[open]");
    for (var i = 0; i < openDropdowns.length; i++) {
      if (!openDropdowns[i].contains(e.target)) {
        openDropdowns[i].removeAttribute("open");
      }
    }
  });
})();
