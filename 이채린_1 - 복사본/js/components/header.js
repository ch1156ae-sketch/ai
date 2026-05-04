window.renderHeader = function renderHeader(options = {}) {
    const title = options.title || "";
    const logo = options.logo === true;
    const backHref = options.backHref || "";
    const root = document.getElementById("appHeader");
    if (!root) return;

    const backButton = backHref
        ? `<a href="${backHref}" class="back-btn" aria-label="뒤로가기"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg></a>`
        : "";

    const left = logo
        ? `<h1 class="logo"><a href="index.html" class="logo-home-link" aria-label="홈으로 이동"><img class="https://ch1156ae-sketch.github.io/ai/logo/home_logo.png" src="https://ch1156ae-sketch.github.io/ai/logo/home_logo.png" alt="UTBT" /></a></h1>`
        : `<div class="page-title-group">${backButton}<h1 class="page-title">${title}</h1></div>`;

    root.innerHTML = `
        <header class="header">
            ${left}
            <nav class="header-icons" aria-label="상단 메뉴">
                <a href="alarm.html" class="icon-btn alarm-open-trigger" aria-label="알림">
                    <svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                </a>
                <a href="cart.html" class="icon-btn cart-icon-btn cart-open-trigger" aria-label="장바구니">
                    <svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 7h12l1 14H5L6 7Z" />
                        <path d="M9 7a3 3 0 0 1 6 0" />
                    </svg>
                    <span class="cart-count-badge" aria-label="장바구니 담긴 총 갯수" aria-live="polite">0</span>
                </a>
            </nav>
        </header>
    `;
};
