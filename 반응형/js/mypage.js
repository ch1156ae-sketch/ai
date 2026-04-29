document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profileForm");
    const emailSelect = document.getElementById("emailSelect");
    const emailDomain = document.getElementById("emailDomain");
    const cancelBtn = document.querySelector(".btn-cancel");
    const phoneMiddle = document.getElementById("phoneMiddle");
    const phoneLast = document.getElementById("phoneLast");

    const openWithdrawModal = document.getElementById("openWithdrawModal");
    const closeWithdrawModal = document.getElementById("closeWithdrawModal");
    const withdrawModal = document.getElementById("withdrawModal");
    const withdrawForm = document.getElementById("withdrawForm");
    const withdrawPw = document.getElementById("withdrawPw");
    const withdrawPwCheck = document.getElementById("withdrawPwCheck");
    const withdrawAgree = document.getElementById("withdrawAgree");

    function onlyNumber(event) {
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }

    function openModal() {
        if (!withdrawModal) return;

        withdrawModal.classList.add("is-open");
        withdrawModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!withdrawModal) return;

        withdrawModal.classList.remove("is-open");
        withdrawModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (withdrawForm) {
            withdrawForm.reset();
        }
    }

    if (emailSelect && emailDomain) {
        emailSelect.addEventListener("change", function () {
            if (emailSelect.value === "") {
                emailDomain.value = "";
                emailDomain.readOnly = false;
                emailDomain.focus();
                return;
            }

            emailDomain.value = emailSelect.value;
            emailDomain.readOnly = true;
        });
    }

    if (phoneMiddle) {
        phoneMiddle.addEventListener("input", onlyNumber);
    }

    if (phoneLast) {
        phoneLast.addEventListener("input", onlyNumber);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", function () {
            window.history.back();
        });
    }

    if (profileForm) {
        profileForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const password = document.getElementById("userPw").value.trim();
            const passwordCheck = document
                .getElementById("userPwCheck")
                .value.trim();

            if (password !== "" || passwordCheck !== "") {
                if (password.length < 6) {
                    alert("비밀번호는 6자 이상 입력해주세요.");
                    return;
                }

                if (password.includes(" ")) {
                    alert("비밀번호에는 공백을 입력할 수 없습니다.");
                    return;
                }

                if (password !== passwordCheck) {
                    alert("비밀번호가 일치하지 않습니다.");
                    return;
                }
            }

            alert("기본정보가 저장되었습니다.");
        });
    }

    if (openWithdrawModal) {
        openWithdrawModal.addEventListener("click", function () {
            openModal();
        });
    }

    if (closeWithdrawModal) {
        closeWithdrawModal.addEventListener("click", function () {
            closeModal();
        });
    }

    if (withdrawModal) {
        withdrawModal.addEventListener("click", function (event) {
            if (event.target === withdrawModal) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            withdrawModal &&
            withdrawModal.classList.contains("is-open")
        ) {
            closeModal();
        }
    });

    if (withdrawForm) {
        withdrawForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const password = withdrawPw.value.trim();
            const passwordCheck = withdrawPwCheck.value.trim();

            if (password.length < 6) {
                alert("비밀번호는 6자 이상 입력해주세요.");
                withdrawPw.focus();
                return;
            }

            if (password.includes(" ")) {
                alert("비밀번호에는 공백을 입력할 수 없습니다.");
                withdrawPw.focus();
                return;
            }

            if (password !== passwordCheck) {
                alert("비밀번호가 일치하지 않습니다.");
                withdrawPwCheck.focus();
                return;
            }

            if (!withdrawAgree.checked) {
                alert("탈퇴 동의를 체크해주세요.");
                withdrawAgree.focus();
                return;
            }

            alert("회원탈퇴가 처리되었습니다.");
            closeModal();
        });
    }
});
