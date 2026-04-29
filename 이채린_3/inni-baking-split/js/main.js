// =========================================================
// Inni Baking Landing Page
// Split JS: js/main.js
// =========================================================

const siteHeader = document.getElementById("siteHeader");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileLinks = mobileMenu.querySelectorAll("a");

const quickBookingForm = document.getElementById("quickBookingForm");
const bookingClassSelect = document.getElementById("bookingClass");
const bookingDateSelect = document.getElementById("bookingDate");

// Apps Script 배포 URL을 여기에 넣으세요.
// 예: const GOOGLE_APP_SCRIPT_URL = 'https://script.google.com/macros/s/배포ID/exec';
const GOOGLE_APP_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwognd6GiP6wmqyDd_yz79vzqjnw0moRJf_r_0jUCF3u8dd5svF4Rxi5HSUk5OseHgMMw/exec";

function setHeaderState() {
    siteHeader.classList.toggle("scrolled", window.scrollY > 40);
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

function openMobileMenu() {
    mobileMenu.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
}

hamburger.addEventListener("click", openMobileMenu);
mobileMenuClose.addEventListener("click", closeMobileMenu);
mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
        closeMobileMenu();
    }
});

const classScheduleMap = {
    "프렌치 크루아상": [
        "6월 7일 (토) 14:00",
        "6월 15일 (일) 11:00",
        "6월 29일 (일) 14:00",
    ],
    "딸기 쇼트케이크": [
        "6월 14일 (토) 14:00",
        "6월 22일 (일) 11:00",
        "6월 28일 (토) 14:00",
    ],
    "뉴욕 브라우니": [
        "6월 21일 (토) 11:00",
        "6월 22일 (일) 16:00",
        "6월 29일 (일) 11:00",
    ],
};

function updateBookingDateOptions() {
    const selectedClass = bookingClassSelect.value;
    const schedules = classScheduleMap[selectedClass] || [];

    bookingDateSelect.innerHTML = "";

    if (!selectedClass) {
        bookingDateSelect.disabled = true;
        bookingDateSelect.innerHTML =
            '<option value="">희망 클래스를 먼저 선택해주세요</option>';
        return;
    }

    bookingDateSelect.disabled = false;
    bookingDateSelect.innerHTML = '<option value="">일정 선택</option>';

    schedules.forEach((schedule) => {
        const option = document.createElement("option");
        option.value = schedule;
        option.textContent = schedule;
        bookingDateSelect.appendChild(option);
    });
}

bookingClassSelect.addEventListener("change", updateBookingDateOptions);

quickBookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!quickBookingForm.checkValidity()) {
        quickBookingForm.reportValidity();
        return;
    }

    const submitButton = quickBookingForm.querySelector(".booking-form-submit");
    const originalButtonText = submitButton.textContent;
    const formData = new FormData(quickBookingForm);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const className = formData.get("className");
    const date = formData.get("date");

    formData.set(
        "agree",
        document.getElementById("bookingAgree").checked ? "동의" : "미동의",
    );
    formData.append("page", window.location.href);

    submitButton.disabled = true;
    submitButton.textContent = "전송 중...";

    try {
        await fetch(GOOGLE_APP_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: new URLSearchParams(formData),
        });

        alert(`${name}님, 신청이 접수되었습니다.

연락처: ${phone}
희망 클래스: ${className}
희망 일정: ${date}

예약 확정 연락을 드릴 예정입니다.`);

        quickBookingForm.reset();
        updateBookingDateOptions();
    } catch (error) {
        alert("전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Scroll reveal
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
    },
);

document
    .querySelectorAll(".reveal")
    .forEach((element) => revealObserver.observe(element));

// Gallery slider
const track = document.getElementById("galleryTrack");
const slides = Array.from(track.children);
const dotsContainer = document.getElementById("galleryDots");
const prevButton = document.getElementById("galleryPrev");
const nextButton = document.getElementById("galleryNext");

let currentSlide = 0;
let autoSlideId;
let touchStartX = 0;

slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "gallery-dot" + (index === 0 ? " active" : "");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `슬라이드 ${index + 1} 보기`);
    dot.addEventListener("click", () => {
        goToSlide(index);
        restartAutoSlide();
    });
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dotsContainer.querySelectorAll(".gallery-dot").forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentSlide);
        dot.setAttribute(
            "aria-selected",
            dotIndex === currentSlide ? "true" : "false",
        );
    });
}

function startAutoSlide() {
    autoSlideId = window.setInterval(() => goToSlide(currentSlide + 1), 4000);
}

function restartAutoSlide() {
    window.clearInterval(autoSlideId);
    startAutoSlide();
}

prevButton.addEventListener("click", () => {
    goToSlide(currentSlide - 1);
    restartAutoSlide();
});

nextButton.addEventListener("click", () => {
    goToSlide(currentSlide + 1);
    restartAutoSlide();
});

track.addEventListener(
    "touchstart",
    (event) => {
        touchStartX = event.touches[0].clientX;
    },
    { passive: true },
);

track.addEventListener(
    "touchend",
    (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
            restartAutoSlide();
        }
    },
    { passive: true },
);

startAutoSlide();

// FAQ accordion
document.querySelectorAll(".notice-q").forEach((button) => {
    button.addEventListener("click", () => {
        const item = button.closest(".notice-item");
        const wasOpen = item.classList.contains("open");

        document.querySelectorAll(".notice-item").forEach((otherItem) => {
            otherItem.classList.remove("open");
        });

        if (!wasOpen) item.classList.add("open");
    });
});

// Active nav
const sectionLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

function updateActiveNav() {
    let activeId = "hero";

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 140) {
            activeId = section.id;
        }
    });

    sectionLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("active", isActive);
    });
}

updateActiveNav();
window.addEventListener("scroll", updateActiveNav, { passive: true });
