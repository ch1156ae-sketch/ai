(() => {
    const $ = (selector, parent = document) => parent.querySelector(selector);
    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));

    const joinMain = $("#joinMain");
    const joinCard = $("#joinCard");
    const joinStep = $("#joinStep");

    // 회원가입 메인 영역이 없는 페이지에서는 실행하지 않음
    if (!joinMain || !joinCard || !joinStep) return;

    const pages = $$(".join-page");
    const stepItems = $$("[data-step-item]");

    const agreeAll = $("#agreeAll");
    const requiredChecks = $$(".required-check");

    const confirmTermsBtn = $("#confirmTermsBtn");
    const confirmInfoBtn = $("#confirmInfoBtn");

    const emailSelect = $("#emailSelect");
    const emailDomain = $("#emailDomain");

    // 전체동의 상태 동기화
    const syncAgreeAll = () => {
        if (!agreeAll) return;

        agreeAll.checked =
            requiredChecks.length > 0 &&
            requiredChecks.every((check) => check.checked);
    };

    // 회원가입 단계 이동
    const setStep = (step) => {
        const current = String(step);

        pages.forEach((page) => {
            page.hidden = page.dataset.page !== current;
        });

        stepItems.forEach((item) => {
            const itemStep = Number(item.dataset.stepItem);
            item.classList.toggle("is-active", itemStep <= step);
        });

        joinStep.dataset.current = current;

        [joinMain, joinCard].forEach((target) => {
            target.classList.remove("is-step-1", "is-step-2", "is-step-3");
            target.classList.add(`is-step-${step}`);
        });
    };

    // 전체동의 클릭
    if (agreeAll) {
        agreeAll.addEventListener("change", () => {
            requiredChecks.forEach((check) => {
                check.checked = agreeAll.checked;
            });
        });
    }

    // 개별 약관 체크 시 전체동의 상태 변경
    requiredChecks.forEach((check) => {
        check.addEventListener("change", syncAgreeAll);
    });

    // 약관 아코디언
    $$(".accordion-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const panelId = button.getAttribute("aria-controls");
            const panel = document.getElementById(panelId);

            if (!panel) return;

            const willOpen = button.getAttribute("aria-expanded") !== "true";

            button.setAttribute("aria-expanded", String(willOpen));
            panel.hidden = !willOpen;
        });
    });

    // 이메일 도메인 선택
    if (emailSelect && emailDomain) {
        emailSelect.addEventListener("change", () => {
            if (emailSelect.value === "직접 입력") {
                emailDomain.value = "";
                emailDomain.readOnly = false;
                emailDomain.focus();
                return;
            }

            emailDomain.value = emailSelect.value;
            emailDomain.readOnly = true;
        });
    }

    // 1단계 → 2단계
    if (confirmTermsBtn) {
        confirmTermsBtn.addEventListener("click", () => {
            setStep(2);
        });
    }

    // 2단계 → 3단계
    if (confirmInfoBtn) {
        confirmInfoBtn.addEventListener("click", () => {
            setStep(3);
        });
    }

    syncAgreeAll();
    setStep(1);
})();
