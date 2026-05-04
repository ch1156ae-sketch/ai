// 스플래쉬 화면, 페이지바, 버튼 요소 선택
const slides = document.querySelectorAll(".splash-slide");
const dots = document.querySelectorAll(".dot");
const bottomArea = document.querySelector(".bottom-area");
const skipBtn = document.querySelector(".skip-btn");
const loginBtn = document.querySelector(".login-btn");

// 기본 이동 링크
const redirectUrl = "login.html";

// 현재 보여지는 스플래쉬 화면 번호
let currentIndex = 0;

// 자동 전환 타이머
let autoTimer;

// 선택한 번호의 스플래쉬 화면을 보여주는 함수
function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentIndex = index;

    // 마지막 화면에서는 페이지바와 Skip을 숨기고 로그인 버튼 표시
    if (index === slides.length - 1) {
        bottomArea.classList.add("hide");
        loginBtn.classList.add("show");
    } else {
        bottomArea.classList.remove("hide");
        loginBtn.classList.remove("show");
    }
}

// 각 화면을 3초씩 보여주고 다음 화면으로 넘기는 함수
function startAutoTimer() {
    clearTimeout(autoTimer);

    autoTimer = setTimeout(() => {
        if (currentIndex < slides.length - 1) {
            showSlide(currentIndex + 1);
            startAutoTimer();
        } else {
            window.location.href = redirectUrl;
        }
    }, 3000);
}

// Skip 버튼 클릭 시 다음 스플래쉬 화면으로 이동
function goToNextSlide() {
    if (currentIndex < slides.length - 1) {
        showSlide(currentIndex + 1);
        startAutoTimer();
    }
}

// 로그인 버튼 클릭 시 연결된 링크로 이동
function goToNaver() {
    clearTimeout(autoTimer);
    const targetUrl = loginBtn.dataset.link || redirectUrl;
    window.location.href = targetUrl;
}

// 스플래쉬 자동 전환 시작
startAutoTimer();

// 버튼 클릭 이벤트 연결
skipBtn.addEventListener("click", goToNextSlide);
loginBtn.addEventListener("click", goToNaver);
