// --- Preset English messages by category ---
const presetMessagesByCategory = {
  valentine: [
    "You make my heart skip a beat! Happy Valentine's Day!",
    "Every day with you is a new adventure in love.",
    "You're my favorite person in the world. Happy Valentine's!",
    "If kisses were snowflakes, I'd send you a blizzard!",
    "You are the reason I believe in love. Happy Valentine's Day!",
  ],
  apology: [
    "I'm truly sorry. Please forgive me.",
    "I wish I could take back what I said. I'm sorry.",
    "My heart hurts knowing I upset you. Can we start again?",
    "I miss you and I'm sorry for my mistake.",
    "I never meant to hurt you. Please accept my apology.",
  ],
  friendship: [
    "Happy Valentine's Day to an awesome friend!",
    "You're the peanut butter to my jelly!",
    "Thanks for always being there for me.",
    "Friends like you make life sweet!",
    "Sending you lots of love and smiles today!",
  ],
  birthday: [
    "Happy Birthday! Wishing you a day full of love and joy!",
    "May your birthday be as wonderful as you are!",
    "Cheers to another year of amazing adventures!",
    "Hope all your wishes come true. Happy Birthday!",
    "Sending you smiles for every moment of your special day!",
  ],
};

let selectedCategory = "valentine";
let selectedPreset = null;
let currentTheme = "classic";

const presetMessagesDiv = document.getElementById("presetMessages");
const customMessage = document.getElementById("customMessage");
const cardForm = document.getElementById("cardForm");
const cardPreview = document.getElementById("cardPreview");
const shareGroup = document.getElementById("shareGroup");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const shareBtn = document.getElementById("shareBtn");
const cardMusic = document.getElementById("cardMusic");
const effectField = document.getElementById("effectField");
const categoryTabs = document.getElementById("categoryTabs");

// --- Emoji efektleri için global değişken ---
let emojiEffectInterval = null;
const burstEmojis = [
  "💕",
  "💖",
  "💗",
  "💘",
  "💝",
  "💞",
  "💟",
  "💌",
  "💋",
  "💎",
  "✨",
  "🌟",
  "💫",
  "⭐",
  "🌹",
  "🌺",
  "🌻",
  "🌸",
  "🌷",
  "🎉",
  "🎊",
  "🎈",
  "🦄",
  "🫶",
  "🥰",
  "😍",
  "😻",
  "😽",
  "😚",
  "🧸",
  "🍫",
  "🍬",
  "🍭",
  "🍓",
  "🍰",
  "🧁",
  "☁️",
  "🌈",
  "🦋",
  "🕊️",
  "🎶",
  "🎵",
  "🎤",
  "🎧",
  "🎂",
  "🍦",
  "🍩",
  "🍪",
  "🍒",
  "🍎",
  "🍉",
  "🍇",
  "🍑",
  "🍯",
  "🥂",
  "🍾",
  "🥳",
  "🤩",
  "😇",
  "😌",
  "😎",
  "😏",
  "😜",
  "😋",
  "😛",
  "😝",
  "😄",
  "😃",
  "😀",
  "😊",
  "😉",
  "😌",
  "🤗",
  "🤍",
  "❤️",
  "🩷",
  "🩵",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🤎",
  "🖤",
  "🤍",
];

function showCardEffects() {
  // Eğer efekt zaten başlatıldıysa tekrar başlatma
  if (emojiEffectInterval) return;
  emojiEffectInterval = setInterval(() => {
    const emoji = document.createElement("div");
    emoji.className = "emoji-burst";
    emoji.innerHTML =
      burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
    // Rastgele pozisyon
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.top = Math.random() * 100 + "vh";
    emoji.style.fontSize = 18 + Math.random() * 38 + "px";
    emoji.style.position = "fixed";
    emoji.style.pointerEvents = "none";
    emoji.style.zIndex = 1;
    effectField.appendChild(emoji);
    setTimeout(() => emoji.remove(), 4000);
  }, 120); // Her 120ms'de bir yeni emoji
}

function stopCardEffects() {
  if (emojiEffectInterval) {
    clearInterval(emojiEffectInterval);
    emojiEffectInterval = null;
  }
}

function renderPresetMessages() {
  presetMessagesDiv.innerHTML = "";
  const presetMessages = presetMessagesByCategory[selectedCategory];
  presetMessages.forEach((msg, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = msg;
    btn.className = selectedPreset === idx ? "selected" : "";
    btn.onclick = () => {
      selectedPreset = idx;
      customMessage.value = "";
      renderPresetMessages();
    };
    presetMessagesDiv.appendChild(btn);
  });
}
renderPresetMessages();

categoryTabs.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryTabs
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.getAttribute("data-category");
    selectedPreset = null;
    renderPresetMessages();
    updateCardPreview();
  });
});

customMessage.addEventListener("input", () => {
  if (customMessage.value.trim() !== "") {
    selectedPreset = null;
    renderPresetMessages();
  }
});

document.getElementById("theme").addEventListener("change", (e) => {
  currentTheme = e.target.value;
  updateCardPreview();
});

function hideFormAndMessages() {
  document.getElementById("cardForm").classList.add("hide-on-card");
  document.getElementById("presetMessages").classList.add("hide-on-card");
}
function showFormAndMessages() {
  document.getElementById("cardForm").classList.remove("hide-on-card");
  document.getElementById("presetMessages").classList.remove("hide-on-card");
}

function animateLetterOpen() {
  cardPreview.classList.add("letter-open");
  setTimeout(() => {
    cardPreview.classList.remove("letter-open");
  }, 1200);
}

function animateBackground() {
  document.body.classList.add("bg-animated");
}
function stopBackgroundAnimation() {
  document.body.classList.remove("bg-animated");
}

function updateCardPreview() {
  const recipient = document.getElementById("recipient").value.trim();
  const sender = document.getElementById("sender").value.trim();
  const date = document.getElementById("date").value;
  let message = "";
  const presetMessages = presetMessagesByCategory[selectedCategory];
  if (selectedPreset !== null) {
    message = presetMessages[selectedPreset];
  } else if (customMessage.value.trim() !== "") {
    message = customMessage.value.trim();
  }
  if (!message) {
    cardPreview.classList.add("hidden");
    shareGroup.classList.add("hidden");
    showFormAndMessages();
    stopBackgroundAnimation();
    return;
  }
  cardPreview.className = `card-preview theme-${currentTheme}`;
  cardPreview.innerHTML = `
    ${date ? `<div class="card-date">${date}</div>` : ""}
    ${recipient ? `<div class="card-to">To: ${recipient}</div>` : ""}
    <div class="message-box closed">
      <button class="open-btn">Press to open</button>
      <div class="card-message">${message}</div>
    </div>
    ${sender ? `<div class="card-from">— ${sender}</div>` : ""}
  `;
  cardPreview.classList.remove("hidden");
  shareGroup.classList.remove("hidden");
  setupMessageBox();
}

function setupMessageBox() {
  const box = cardPreview.querySelector(".message-box");
  const btn = cardPreview.querySelector(".open-btn");
  if (!box || !btn) return;
  box.classList.add("closed");
  box.classList.remove("open");
  btn.onclick = () => {
    box.classList.remove("closed");
    box.classList.add("open");
    setTimeout(() => {
      animateBackground();
      showCardEffects(); // <-- Emoji efektini başlat
    }, 500);
  };
}

cardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updateCardPreview();
  hideFormAndMessages();
  cardPreview.classList.add("letter-open");
  setTimeout(() => {
    cardPreview.classList.remove("letter-open");
  }, 1200);
  setTimeout(() => {
    cardPreview.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 200);
});

["recipient", "sender", "date"].forEach((id) => {
  document.getElementById(id).addEventListener("input", updateCardPreview);
});

// --- Share/Copy functionality (hash tabanlı, backend yok) ---
function generateCardURL() {
  const data = {
    recipient: document.getElementById("recipient").value.trim(),
    sender: document.getElementById("sender").value.trim(),
    date: document.getElementById("date").value,
    theme: document.getElementById("theme").value,
    message:
      selectedPreset !== null
        ? presetMessagesByCategory[selectedCategory][selectedPreset]
        : document.getElementById("customMessage").value.trim(),
  };
  const params = encodeURIComponent(JSON.stringify(data));
  return `${window.location.origin}${window.location.pathname}#card=${params}`;
}

copyLinkBtn.addEventListener("click", () => {
  const url = generateCardURL();
  navigator.clipboard.writeText(url).then(() => {
    copyLinkBtn.textContent = "Copied!";
    setTimeout(() => (copyLinkBtn.textContent = "Copy Card Link"), 1200);
  });
});

shareBtn.addEventListener("click", () => {
  const url = generateCardURL();
  if (navigator.share) {
    navigator.share({
      title: "Valentine's Card",
      text: "Check out this Valentine card!",
      url,
    });
  } else {
    window.open(url, "_blank");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash;
  if (hash.startsWith("#card=")) {
    try {
      const data = JSON.parse(decodeURIComponent(hash.slice(6)));
      cardPreview.className = `card-preview theme-${data.theme || "classic"}`;
      cardPreview.innerHTML = `
        ${data.date ? `<div class="card-date">${data.date}</div>` : ""}
        ${
          data.recipient
            ? `<div class="card-to">To: ${data.recipient}</div>`
            : ""
        }
        <div class="message-box closed">
          <button class="open-btn">Press to open</button>
          <div class="card-message">${data.message}</div>
        </div>
        ${data.sender ? `<div class="card-from">— ${data.sender}</div>` : ""}
      `;
      cardPreview.classList.remove("hidden");
      shareGroup.classList.remove("hidden");
      hideFormAndMessages();
      cardPreview.classList.add("letter-open");
      setTimeout(() => {
        cardPreview.classList.remove("letter-open");
        // Auto-open the message box after a short delay
        const box = cardPreview.querySelector(".message-box");
        const btn = cardPreview.querySelector(".open-btn");
        if (box && btn) {
          setTimeout(() => {
            btn.click();
          }, 800);
        }
      }, 1200);
      setTimeout(() => {
        cardPreview.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
      setupMessageBox();
    } catch (e) {
      cardPreview.innerHTML =
        "<div class='error'>Card not found or invalid.</div>";
    }
  }
});
