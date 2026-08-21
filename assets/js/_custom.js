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
    var banner = document.createElement("div");
    banner.id = "cookie-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      '<p>This site uses cookies for analytics. Read the <a href="/cookies">cookie policy</a>.</p>' +
      '<div class="cookie-consent-actions">' +
      '<button type="button" data-action="reject">Reject</button>' +
      '<button type="button" data-action="accept">Accept</button>' +
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
  // Remembers which language the visitor last read the site in, and
  // auto-redirects a returning visitor from one language's homepage to
  // the other's. This is functional storage (not analytics/tracking),
  // so it runs independently of the cookie-consent banner above.
  //
  // Scope is deliberately limited to the two homepages ("/" and "/de/"):
  // deep links (e.g. a shared post URL) are never redirected, so sharing
  // a link or following a search result always lands where expected.
  // Search engine crawlers have no stored preference, so this never
  // affects what gets indexed — hreflang tags handle that separately.
  var LANG_KEY = "preferred_lang";
  var currentLang = document.documentElement.lang; // "en" or "de"
  var storedLang = localStorage.getItem(LANG_KEY);

  var path = window.location.pathname;
  var isEnglishHome = path === "/";
  var isGermanHome = path === "/de/" || path === "/de";

  var redirected = false;
  if (storedLang && storedLang !== currentLang) {
    if (storedLang === "de" && isEnglishHome) {
      redirected = true;
      window.location.replace("/de/");
    } else if (storedLang === "en" && isGermanHome) {
      redirected = true;
      window.location.replace("/");
    }
  }

  if (!redirected && currentLang) {
    localStorage.setItem(LANG_KEY, currentLang);
  }
})();
