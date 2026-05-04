document.addEventListener("DOMContentLoaded", () => {
    const data = window.UTBT_DATA || {};
    const products = Array.isArray(data.products) ? data.products : [];

    const utils = window.UTBT || {};
    const $ =
        utils.$ ||
        ((selector, root = document) => root.querySelector(selector));
    const $$ =
        utils.$$ ||
        ((selector, root = document) =>
            Array.from(root.querySelectorAll(selector)));

    const RECENT_KEY = "utbtRecentKeywords";

    const input = $(".search-input");
    const mobileApp = $(".mobile-app");
    const searchContent = $(".search-content");
    const searchBackBtn = $(".search-back-btn");

    const resultArea = $(".search-result-area");
    const resultTitle = $(".search-result-title");
    const emptyText = $(".search-empty-text");
    const resultGrid = $(".search-result-grid");
    const fallbackGrid = $(".recommend-fallback-grid");
    const fallbackTitle = $(".recommend-fallback-title");

    const recentList = $(".recent-keyword-list");
    const keywordSections = $$(".search-section", searchContent);

    const formatWon = (value) => {
        const number = Number(String(value).replace(/[^0-9]/g, ""));
        return `${number.toLocaleString()}원`;
    };

    const escapeHTML = (value) => {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    };

    const makeProductCard = (product) => {
        if (typeof utils.productCardHTML === "function") {
            return utils.productCardHTML(product);
        }

        const name = product.name || "상품명";
        const price = product.price || product.unitPrice || 0;
        const img = product.img || product.image || "";

        return `
            <li class="product-card">
                <div class="product-img">
                    <img src="${escapeHTML(img)}" alt="${escapeHTML(name)}" />
                </div>
                <button type="button" class="cart-btn">담기</button>
                <h3>${escapeHTML(name)}</h3>
                <p>${formatWon(price)}</p>
            </li>
        `;
    };

    const defaultRecentKeywords = [
        "무농약 브로콜리",
        "세척당근 5kg",
        "대파 파지",
        "파지 치즈",
        "스테비아 방울토마토",
    ];

    const getRecent = () => {
        try {
            const saved = JSON.parse(localStorage.getItem(RECENT_KEY));
            return Array.isArray(saved) ? saved : defaultRecentKeywords;
        } catch {
            return defaultRecentKeywords;
        }
    };

    const setRecent = (items) => {
        localStorage.setItem(RECENT_KEY, JSON.stringify(items.slice(0, 10)));
    };

    const renderRecent = () => {
        const recent = getRecent();

        recentList.innerHTML = recent.length
            ? recent
                  .map(
                      (keyword) =>
                          `<button type="button" class="keyword-chip recent">${escapeHTML(keyword)}</button>`,
                  )
                  .join("")
            : `<p class="search-empty-text">최근 검색어가 없습니다.</p>`;
    };

    const saveKeyword = (keyword) => {
        const recent = getRecent().filter((item) => item !== keyword);
        recent.unshift(keyword);
        setRecent(recent);
        renderRecent();
    };

    const normalizeText = (value) => {
        return String(value || "")
            .replace(/\s/g, "")
            .toLowerCase();
    };

    const searchProducts = (keyword) => {
        const normalizedKeyword = normalizeText(keyword);

        return products.filter((product) => {
            const name = normalizeText(product.name);
            const tags = Array.isArray(product.tags)
                ? normalizeText(product.tags.join(" "))
                : normalizeText(product.tags);

            return (
                name.includes(normalizedKeyword) ||
                tags.includes(normalizedKeyword)
            );
        });
    };

    const showKeywordMode = () => {
        searchContent.classList.remove("is-result-mode");
        resultArea.classList.remove("show");

        resultTitle.textContent = "";
        emptyText.textContent = "";
        resultGrid.innerHTML = "";
        fallbackTitle.style.display = "none";
        fallbackGrid.innerHTML = "";

        keywordSections.forEach((section) => {
            section.removeAttribute("aria-hidden");
        });
    };

    const showResultMode = () => {
        searchContent.classList.add("is-result-mode");
        resultArea.classList.add("show");

        keywordSections.forEach((section) => {
            section.setAttribute("aria-hidden", "true");
        });

        if (mobileApp) {
            mobileApp.scrollTop = 0;
        }
    };

    const runSearch = (keyword) => {
        const safeKeyword = keyword.trim();

        if (!safeKeyword) {
            showKeywordMode();
            alert("검색어를 입력해 주세요.");
            return;
        }

        input.value = safeKeyword;
        saveKeyword(safeKeyword);

        const results = searchProducts(safeKeyword);

        showResultMode();

        resultTitle.textContent = `“${safeKeyword}” 검색 결과`;
        resultGrid.innerHTML = results.map(makeProductCard).join("");

        if (results.length === 0) {
            emptyText.textContent =
                "검색 결과가 없습니다. 대신 많이 찾는 상품을 추천해 드릴게요.";

            fallbackTitle.style.display = "block";
            fallbackGrid.innerHTML = products
                .slice(0, 4)
                .map(makeProductCard)
                .join("");
        } else {
            emptyText.textContent = `${results.length}개의 상품을 찾았어요.`;
            fallbackTitle.style.display = "none";
            fallbackGrid.innerHTML = "";
        }
    };

    $(".search-form").addEventListener("submit", (e) => {
        e.preventDefault();
        runSearch(input.value);
    });

    document.addEventListener("click", (e) => {
        const keywordButton = e.target.closest(
            ".keyword-chip, .popular-keyword-btn",
        );
        if (!keywordButton) return;

        const text = keywordButton.classList.contains("popular-keyword-btn")
            ? keywordButton.querySelector(".popular-keyword-text").textContent
            : keywordButton.textContent;

        runSearch(text.trim());
    });

    input.addEventListener("input", () => {
        if (!input.value.trim()) {
            showKeywordMode();
        }
    });

    $(".clear-recent-btn").addEventListener("click", () => {
        setRecent([]);
        renderRecent();
    });

    if (searchBackBtn) {
        searchBackBtn.addEventListener("click", () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = "index.html";
            }
        });
    }

    renderRecent();
    showKeywordMode();
});
