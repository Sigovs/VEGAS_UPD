/* ============================================================
   All Auto Network — private preview gate
   Simple site-wide password. Entered once, remembered across
   pages and visits (localStorage) until the browser data is
   cleared. NOTE: this is a client-side barrier for previews,
   not real security — the source is still downloadable.
   ------------------------------------------------------------
   To change the password, edit PASSWORD below.
   ============================================================ */
(function () {
  var PASSWORD = "cars";               // <-- change to your password
  var KEY = "aan_access";              // localStorage flag

  try { if (localStorage.getItem(KEY) === "1") return; } catch (e) {}

  // Hide the page until unlocked (script runs in <head>, before <body> paints)
  var hide = document.createElement("style");
  hide.id = "aan-gate-hide";
  hide.textContent = "body{display:none!important}";
  (document.head || document.documentElement).appendChild(hide);

  function build() {
    if (document.getElementById("aan-gate")) return;

    var css = document.createElement("style");
    css.textContent = [
      "#aan-gate{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;",
      "background:radial-gradient(ellipse 70% 60% at 50% 35%,#16212d 0%,#0B0F14 70%),#0B0F14;",
      "font-family:'Roboto Condensed',system-ui,Arial,sans-serif;padding:24px;}",
      "#aan-gate *{box-sizing:border-box;}",
      "#aan-gate .aan-card{width:100%;max-width:420px;background:#131820;border:1px solid #1f2933;border-radius:14px;",
      "padding:40px 34px;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.5);}",
      "#aan-gate .aan-brand{font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.28em;text-transform:uppercase;",
      "font-size:13px;color:#CEB655;margin:0 0 22px;}",
      "#aan-gate h1{font-family:'Oswald',sans-serif;font-weight:500;text-transform:uppercase;letter-spacing:.04em;",
      "font-size:26px;line-height:1.15;color:#f5f5f5;margin:0 0 10px;}",
      "#aan-gate p{font-size:15px;color:#9aa3ad;margin:0 0 26px;line-height:1.5;}",
      "#aan-gate input{width:100%;height:50px;padding:0 16px;background:rgba(255,255,255,.9);border:1px solid transparent;",
      "border-radius:8px;color:#0B0F14;font-size:16px;font-family:inherit;outline:none;transition:border-color .2s;}",
      "#aan-gate input:focus{border-color:#CEB655;}",
      "#aan-gate button{width:100%;height:50px;margin-top:14px;border:0;border-radius:8px;cursor:pointer;",
      "background:#CEB655;color:#0B0F14;font-family:'Oswald',sans-serif;font-weight:600;letter-spacing:.12em;",
      "text-transform:uppercase;font-size:14px;transition:background .2s;}",
      "#aan-gate button:hover{background:#dcc56a;}",
      "#aan-gate .aan-err{min-height:18px;margin-top:14px;color:#e2746a;font-size:13px;letter-spacing:.04em;",
      "text-transform:uppercase;opacity:0;transition:opacity .2s;}",
      "#aan-gate .aan-err.show{opacity:1;}",
      "@keyframes aan-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}",
      "#aan-gate .aan-card.shake{animation:aan-shake .4s;}"
    ].join("");
    document.documentElement.appendChild(css);

    var wrap = document.createElement("div");
    wrap.id = "aan-gate";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.innerHTML =
      '<div class="aan-card">' +
        '<p class="aan-brand">All Auto Network</p>' +
        '<h1>Private Preview</h1>' +
        '<p>This site is a private preview. Please enter the password to continue.</p>' +
        '<input id="aan-pass" type="password" autocomplete="off" autofocus placeholder="Password" aria-label="Password">' +
        '<button id="aan-go" type="button">Enter</button>' +
        '<div class="aan-err" id="aan-err">Incorrect password</div>' +
      '</div>';
    document.documentElement.appendChild(wrap);

    var input = wrap.querySelector("#aan-pass");
    var err = wrap.querySelector("#aan-err");
    var card = wrap.querySelector(".aan-card");

    function submit() {
      if (input.value === PASSWORD) {
        try { localStorage.setItem(KEY, "1"); } catch (e) {}
        wrap.remove();
        css.remove();
        var h = document.getElementById("aan-gate-hide");
        if (h) h.remove();
      } else {
        err.classList.add("show");
        card.classList.remove("shake");
        void card.offsetWidth;     // reflow to restart animation
        card.classList.add("shake");
        input.value = "";
        input.focus();
      }
    }

    wrap.querySelector("#aan-go").addEventListener("click", submit);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") submit();
      else err.classList.remove("show");
    });
    input.focus();
  }

  if (document.readyState === "loading" && !document.body) {
    // <head> stage: documentElement exists, mount overlay onto it immediately
    build();
  } else {
    build();
  }
})();
