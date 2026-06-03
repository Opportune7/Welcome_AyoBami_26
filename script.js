(function () {
  "use strict";

  var NAMES = [
    { name: "Abdulhafiz", meaning: "Servant of the Protector", primary: true },
    { name: "Ayobami", meaning: "Joy has found me" },
    { name: "Olamide", meaning: "Wealth has come to me" },
    { name: "Iremide", meaning: "Goodness has come to me" },
    { name: "Ariyo", meaning: "One we rejoice over" },
    { name: "Oluwadamilare", meaning: "God has made me a king" },
    { name: "Atanda", meaning: "One who spreads fame" }
  ];

  var activeIdx = 0;
  var timerId = null;

  var activeNameEl = document.getElementById("activeName");
  var activeMeaningEl = document.getElementById("activeMeaning");
  var gridEl = document.getElementById("nameGrid");
  var toastEl = document.getElementById("toast");
  var qrImg = document.getElementById("qrImg");

  // Build name grid
  function buildGrid() {
    gridEl.innerHTML = "";
    NAMES.forEach(function (n, i) {
      var card = document.createElement("article");
      card.className = "name-card anim-fade-up" + (n.primary ? " primary" : "");
      card.style.animationDelay = (i * 80) + "ms";
      card.dataset.index = String(i);

      var eyebrow = document.createElement("span");
      eyebrow.className = "name-card-eyebrow";
      eyebrow.textContent = n.primary ? "Primary name" : "Name";

      var title = document.createElement("h3");
      title.className = "name-card-title";
      title.textContent = n.name;

      var meaning = document.createElement("p");
      meaning.className = "name-card-meaning";
      meaning.textContent = n.meaning;

      card.appendChild(eyebrow);
      card.appendChild(title);
      card.appendChild(meaning);
      gridEl.appendChild(card);
    });
    updateActiveCard();
  }

  function updateActiveCard() {
    var cards = gridEl.querySelectorAll(".name-card");
    cards.forEach(function (c, i) {
      c.classList.toggle("active", i === activeIdx);
    });
  }

  function setActive(idx) {
    activeIdx = idx;
    var n = NAMES[idx];

    // restart animation by cloning
    activeNameEl.textContent = n.name;
    activeMeaningEl.innerHTML = "&ldquo;" + n.meaning + "&rdquo;";

    activeNameEl.classList.remove("anim-name-pop");
    activeMeaningEl.classList.remove("anim-fade-up");
    // force reflow
    void activeNameEl.offsetWidth;
    void activeMeaningEl.offsetWidth;
    activeNameEl.classList.add("anim-name-pop");
    activeMeaningEl.classList.add("anim-fade-up");

    updateActiveCard();
  }

  function startRotator() {
    if (timerId) clearInterval(timerId);
    activeIdx = 0;
    setActive(0);
    timerId = window.setInterval(function () {
      setActive((activeIdx + 1) % NAMES.length);
    }, 1800);
  }

  // Toast
  var toastTimer = null;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl.classList.remove("show");
    }, 2200);
  }

  // Sharing
  function getShareLink() {
    return window.location.href;
  }

  function copyLink() {
    var link = getShareLink();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(
        function () { showToast("Link copied to clipboard"); },
        function () { fallbackCopy(link); }
      );
    } else {
      fallbackCopy(link);
    }
  }

  function fallbackCopy(text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast("Link copied to clipboard");
    } catch (e) {
      showToast("Could not copy link");
    }
  }

  function shareNative() {
    if (navigator.share) {
      navigator.share({
        title: "Abdulhafiz's Naming Ceremony",
        text: "You are welcome to Abdulhafiz's naming ceremony.",
        url: getShareLink()
      }).catch(function () { /* user cancelled */ });
    } else {
      copyLink();
    }
  }

  // QR code
  function setQr() {
    var url = "https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&color=3b2a25&bgcolor=fffaf0&data=" + encodeURIComponent(getShareLink());
    qrImg.src = url;
  }

  // Wire up
  document.getElementById("replayBtn").addEventListener("click", startRotator);
  document.getElementById("shareBtn").addEventListener("click", shareNative);
  document.getElementById("shareBtn2").addEventListener("click", shareNative);
  document.getElementById("copyBtn").addEventListener("click", copyLink);
  document.getElementById("copyBtn2").addEventListener("click", copyLink);

  // ── Background Music ──────────────────────────────────────
  var audio     = document.getElementById("bgAudio");
  var musicBtn  = document.getElementById("musicBtn");
  var iconOn    = document.getElementById("iconOn");
  var iconOff   = document.getElementById("iconOff");
  var musicLabel = document.getElementById("musicLabel");
  var isMuted   = false;

  audio.volume = 0.35; // gentle background level

  function setMusicState(muted) {
    isMuted = muted;
    if (muted) {
      audio.pause();
      iconOn.style.display  = "none";
      iconOff.style.display = "block";
      musicLabel.textContent = "Music off";
      musicBtn.setAttribute("aria-label", "Unmute background music");
      musicBtn.classList.add("muted");
      musicBtn.classList.remove("playing");
    } else {
      audio.play().catch(function () {});
      iconOn.style.display  = "block";
      iconOff.style.display = "none";
      musicLabel.textContent = "Music on";
      musicBtn.setAttribute("aria-label", "Mute background music");
      musicBtn.classList.remove("muted");
      musicBtn.classList.add("playing");
    }
  }

  musicBtn.addEventListener("click", function () {
    setMusicState(!isMuted);
  });

  // Browsers block autoplay until the user interacts with the page.
  // We attempt to play on the first user gesture anywhere on the page.
  var started = false;
  function tryStart() {
    if (started || isMuted) return;
    started = true;
    audio.play().then(function () {
      musicBtn.classList.add("playing");
    }).catch(function () {
      // still blocked — user can click the button manually
    });
    document.removeEventListener("click", tryStart);
    document.removeEventListener("keydown", tryStart);
    document.removeEventListener("touchstart", tryStart);
  }
  document.addEventListener("click", tryStart);
  document.addEventListener("keydown", tryStart);
  document.addEventListener("touchstart", tryStart);
  // ──────────────────────────────────────────────────────────

  buildGrid();
  setQr();
  startRotator();
})();
