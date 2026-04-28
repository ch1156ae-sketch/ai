window.renderBottomNav = function renderBottomNav(active = "home") {
    const root = document.getElementById("appBottomNav");
    if (!root) return;

    // 여기에서 홈바 아이콘 이미지를 직접 바꾸면 됨
    // icon: 기본 이미지
    // activeIcon: 호버 / 선택 이미지
    const navItems = [
        {
            key: "home",
            href: "index.html",
            label: "홈",
            icon: "./images/icons/homebar_home_off.png",
            activeIcon: "./images/icons/homebar_home_on.png",
        },
        {
            key: "category",
            href: "category.html",
            label: "카테고리",
            icon: "./images/icons/homebar_category_off.png",
            activeIcon: "./images/icons/homebar_category_on.png",
        },
        {
            key: "recommend",
            href: "recommend.html",
            label: "추천",
            icon: "./images/icons/homebar_recommend_off.png",
            activeIcon: "./images/icons/homebar_recommend_on.png",
        },
        {
            key: "search",
            href: "search.html",
            label: "검색",
            icon: "./images/icons/homebar_search_off.png",
            activeIcon: "./images/icons/homebar_search_on.png",
        },
        {
            key: "mypage",
            href: "mypage.html",
            label: "마이페이지",
            icon: "./images/icons/homebar_my_off.png",
            activeIcon: "./images/icons/homebar_my_on.png",
        },
    ];

    const navHtml = navItems
        .map(({ key, href, label, icon, activeIcon }) => {
            const isActive = active === key ? "active" : "";

            return `
                <a href="${href}" class="nav-item ${isActive}" aria-label="${label}">
                    <span class="nav-icon-wrap" aria-hidden="true">
                        <img class="nav-icon nav-icon-default" src="${icon}" alt="" />
                        <img class="nav-icon nav-icon-active" src="${activeIcon}" alt="" />
                    </span>
                    <span class="nav-label">${label}</span>
                </a>
            `;
        })
        .join("");

    root.innerHTML = `
        <nav class="bottom-nav" aria-label="하단 메뉴">
            ${navHtml}
        </nav>
    `;
};
