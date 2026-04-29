const includePartials = async () => {
  const targets = document.querySelectorAll("[data-include]");
  await Promise.all([...targets].map(async (el) => {
    try {
      const res = await fetch(el.dataset.include);
      if (!res.ok) throw new Error(el.dataset.include);
      el.outerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<!-- include failed: ${err.message} -->`;
    }
  }));
};

function initHeader() {
  const header = document.getElementById("siteHeader");
  const menuBtn = document.getElementById("menuBtn");
  const gnbLinks = document.querySelectorAll(".gnb a[data-menu]");
  const megaMenu = document.getElementById("megaMenu");
  const megaTitle = document.getElementById("megaTitle");
  const megaList = document.getElementById("megaList");
  const mobileGroups = document.querySelectorAll(".mobile-menu-group");
  const mobileLinks = document.querySelectorAll(".mobile-panel a");

  if (!header || !menuBtn) return;

  let megaCloseTimer = null;

  menuBtn.addEventListener("click", () => {
    header.classList.toggle("open");
    const open = header.classList.contains("open");
    document.body.classList.toggle("mobile-menu-lock", open);
    menuBtn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  });

  const megaData = {
    about: { title: "협회소개", items: ["협회소개", "인사말", "연혁", "조직도", "오시는 길"] },
    promo: { title: "홍보광장", items: ["공지사항", "언론보도", "갤러리", "영상"] },
    artist: { title: "아젤리아 드레스", items: ["브랜드 소개", "아젤리아 드레스", "아젤리아 궁중한복", "아젤리아 키즈", "아젤리아 패션쇼 & 어워즈", "아젤리아 예술단"] },
    exchange: { title: "국제교류체험관", items: ["아젤리아 메거진", "아젤리아 TV 방송", "아젤리아 엔터", "국내 · 국제교류 기획 공연 이벤트", "국제교류한복체험", "전통한문화포럼"] },
    donate: { title: "나눔과기쁨 & 복지관", items: ["(사) 나눔과 기쁨"] },
    partner: { title: "협력기관", items: ["협력기관 정보"] },
  };

  const openMega = (key) => {
    if (!megaMenu || !megaTitle || !megaList || window.innerWidth <= 1024) return;
    const data = megaData[key];
    if (!data) return;

    window.clearTimeout(megaCloseTimer);
    megaTitle.textContent = data.title;
    megaList.innerHTML = data.items.map((item) => `<a href="#">${item}</a>`).join("");

    gnbLinks.forEach((a) => a.classList.toggle("is-active", a.dataset.menu === key));
    megaMenu.classList.add("is-open");
  };

  const closeMega = () => {
    if (!megaMenu) return;
    megaMenu.classList.remove("is-open");
    gnbLinks.forEach((a) => a.classList.remove("is-active"));
  };

  const scheduleClose = () => {
    window.clearTimeout(megaCloseTimer);
    megaCloseTimer = window.setTimeout(closeMega, 180);
  };

  gnbLinks.forEach((a) => {
    a.addEventListener("mouseenter", () => openMega(a.dataset.menu));
    a.addEventListener("focus", () => openMega(a.dataset.menu));
    a.addEventListener("click", (event) => {
      if (window.innerWidth > 1024) {
        event.preventDefault();
        openMega(a.dataset.menu);
      }
    });
  });

  const headerWrap = header.querySelector(":scope > .wrap");
  headerWrap?.addEventListener("mouseenter", () => window.clearTimeout(megaCloseTimer));
  headerWrap?.addEventListener("mouseleave", scheduleClose);
  megaMenu?.addEventListener("mouseenter", () => window.clearTimeout(megaCloseTimer));
  megaMenu?.addEventListener("mouseleave", scheduleClose);

  mobileGroups.forEach((group) => {
    const trigger = group.querySelector(".mobile-menu-trigger");
    trigger?.addEventListener("click", () => {
      const isOpen = group.classList.contains("is-open");
      mobileGroups.forEach((item) => {
        item.classList.remove("is-open");
        item.querySelector(".mobile-menu-trigger")?.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        group.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  mobileLinks.forEach((a) => {
    a.addEventListener("click", () => {
      header.classList.remove("open");
      document.body.classList.remove("mobile-menu-lock");
      menuBtn.setAttribute("aria-label", "메뉴 열기");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 480) {
      header.classList.remove("open");
      document.body.classList.remove("mobile-menu-lock");
      menuBtn.setAttribute("aria-label", "메뉴 열기");
    }
  });
}

function initTopButton() {
  const topBtn = document.getElementById("topBtn");
  if (!topBtn) return;
  const toggle = () => topBtn.classList.toggle("show", window.scrollY > 280);
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initMainBanner() {
  const slides = document.querySelectorAll(".main-banner-slide");
  const featureNum = document.querySelector(".feature-num");
  const thumb = document.querySelector(".feature-thumb-img");
  const thumbs = ["./images/banner_thumb01.png", "./images/banner_thumb02.png", "./images/banner_thumb03.png"];
  if (!slides.length) return;

  let idx = 0;
  const show = (nextIndex) => {
    idx = nextIndex % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === idx));
    if (featureNum) featureNum.textContent = String(idx + 1).padStart(2, "0");
    if (thumb) thumb.src = thumbs[idx];
  };

  show(0);
  window.setInterval(() => show(idx + 1), 5000);
}

function initNoticeTabs() {
  const buttons = document.querySelectorAll(".notice-tabs button");
  const cards = document.querySelectorAll(".notice-card");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      cards.forEach((card) => {
        card.classList.toggle("is-hidden", !(filter === "all" || card.dataset.type === filter));
      });
    });
  });
}

function initGalleryRolling() {
  const track = document.querySelector(".gallery-track");
  if (!track) return;

  let timer = null;
  let moving = false;

  const setFeatured = () => {
    track.querySelectorAll(".gallery-card").forEach((c) => c.classList.remove("is-featured"));
    const first = track.querySelector(".gallery-card");
    if (first && window.innerWidth > 1024) first.classList.add("is-featured");
  };

  const move = () => {
    if (window.innerWidth <= 1024 || moving) return;
    const first = track.querySelector(".gallery-card");
    if (!first) return;

    moving = true;
    const width = first.getBoundingClientRect().width + 24;
    track.classList.add("is-moving");
    track.style.transform = `translateX(-${width}px)`;

    track.addEventListener("transitionend", () => {
      track.appendChild(first);
      track.classList.remove("is-moving");
      track.style.transform = "translateX(0)";
      setFeatured();
      moving = false;
    }, { once: true });
  };

  const setup = () => {
    window.clearInterval(timer);
    track.classList.remove("is-moving");
    track.style.transform = "translateX(0)";
    moving = false;

    if (window.innerWidth <= 1024) {
      track.querySelectorAll(".gallery-card").forEach((c) => c.classList.remove("is-featured", "is-selected"));
      return;
    }

    setFeatured();
    timer = window.setInterval(move, 5600);
  };

  track.addEventListener("click", (event) => {
    const card = event.target.closest(".gallery-card");
    if (!card) return;
    event.preventDefault();
    track.querySelectorAll(".gallery-card.is-selected").forEach((c) => c.classList.remove("is-selected"));
    card.classList.add("is-selected");
  });

  window.addEventListener("resize", setup);
  setup();
}

async function init() {
  await includePartials();
  initHeader();
  initTopButton();
  initMainBanner();
  initNoticeTabs();
  initGalleryRolling();
}

document.addEventListener("DOMContentLoaded", init);
