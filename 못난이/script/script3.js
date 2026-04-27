const loginForm = document.querySelector("#loginForm");
const userId = document.querySelector("#userId");
const userPw = document.querySelector("#userPw");
const errorMessage = document.querySelector("#errorMessage");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const idValue = userId.value.trim();
    const pwValue = userPw.value.trim();

    if (idValue === "" && pwValue === "") {
        errorMessage.textContent = "아이디와 비밀번호를 입력해주세요.";
        userId.focus();
        return;
    }

    if (idValue === "") {
        errorMessage.textContent = "아이디 또는 이메일을 입력해주세요.";
        userId.focus();
        return;
    }

    if (pwValue === "") {
        errorMessage.textContent = "비밀번호를 입력해주세요.";
        userPw.focus();
        return;
    }

    errorMessage.textContent = "";
    window.location.href = "home.html";
});

const socialButtons = document.querySelectorAll(".social-btn");

socialButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const url = button.dataset.url;

        if (url) {
            window.location.href = url;
        }
    });
});
