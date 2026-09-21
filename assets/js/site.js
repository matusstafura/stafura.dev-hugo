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

  // Copy button on code blocks in post content.
  var COPY_ICON =
    '<svg class="icon-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
    '<svg class="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (err) {}
      ta.remove();
      ok ? resolve() : reject();
    });
  }

  var blocks = document.querySelectorAll(".prose pre");
  for (var b = 0; b < blocks.length; b++) {
    var pre = blocks[b];
    var host = pre.parentNode;
    if (!host.classList.contains("highlight")) {
      host = document.createElement("div");
      host.className = "highlight";
      pre.parentNode.insertBefore(host, pre);
      host.appendChild(pre);
    }
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-code";
    btn.setAttribute("aria-label", "Copy code");
    btn.title = "Copy code";
    btn.innerHTML = COPY_ICON;
    host.appendChild(btn);
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".copy-code");
    if (!btn) return;
    var code = btn.parentNode.querySelector("pre");
    copyText(code.innerText.replace(/\n$/, "")).then(function () {
      btn.setAttribute("data-copied", "");
      btn.setAttribute("aria-label", "Copied");
      setTimeout(function () {
        btn.removeAttribute("data-copied");
        btn.setAttribute("aria-label", "Copy code");
      }, 2000);
    }, function () {});
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
