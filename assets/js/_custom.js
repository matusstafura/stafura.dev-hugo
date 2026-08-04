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
