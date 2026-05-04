(() => {
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
    const CART_KEY = "utbtCartItems";
    const CHECKOUT_KEY = "utbtCheckoutItems";
    const ADDRESS_KEY = "utbtShippingAddress";

    const formatWon = (value) => `${Number(value || 0).toLocaleString()}원`;
    const getNumberOnly = (value) => Number(String(value || "").replace(/[^0-9]/g, ""));

    const getCartItems = () => {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch (error) {
            return [];
        }
    };

    const setCartItems = (items) => {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
        updateCartCount();
    };

    const updateCartCount = () => {
        const total = getCartItems().reduce((sum, item) => sum + Number(item.count || 0), 0);
        $$(".cart-count-badge").forEach((badge) => {
            badge.textContent = total > 99 ? "99+" : total;
            badge.classList.toggle("show", total > 0);
            badge.setAttribute("aria-label", `장바구니 담긴 총 갯수 ${total}개`);
        });
    };

    const getAddress = () => {
        try {
            return JSON.parse(localStorage.getItem(ADDRESS_KEY)) || { main: "서울특별시 종로구 대학로 123", detail: "101동 502호 (혜화아파트)" };
        } catch (error) {
            return { main: "서울특별시 종로구 대학로 123", detail: "101동 502호 (혜화아파트)" };
        }
    };

    const setAddress = (address) => localStorage.setItem(ADDRESS_KEY, JSON.stringify(address));
    const getAddressHTML = () => {
        const address = getAddress();
        return `${address.main},<br />${address.detail}`;
    };

    const addItemToCart = ({ name, unitPrice, count, img }) => {
        const items = getCartItems();
        const existing = items.find((item) => item.name === name);
        if (existing) {
            existing.count += Number(count);
            existing.selected = true;
        } else {
            items.push({ id: Date.now() + Math.random(), name, unitPrice: Number(unitPrice), count: Number(count), img, selected: true });
        }
        setCartItems(items);
    };

    const productCardHTML = (product, cardClass = "product-card") => `
        <li class="${cardClass}">
            <div class="${cardClass === "recommend-product-card" ? "recommend-product-img" : "product-img"}"><img src="${product.img}" alt="${product.name}" /></div>
            ${cardClass === "recommend-product-card" ? `<div class="recommend-product-info"><h3>${product.name}</h3><p>${formatWon(product.price)}</p><button type="button" class="cart-btn">담기</button></div>` : `<button type="button" class="cart-btn">담기</button><h3>${product.name}</h3><p>${formatWon(product.price)}</p>`}
        </li>
    `;

    const createCartModal = () => {
        const app = $(".mobile-app") || document.body;
        if ($("#globalCartModal")) return;
        const modal = document.createElement("div");
        modal.className = "cart-modal global-cart-modal";
        modal.id = "globalCartModal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.innerHTML = `
            <div class="cart-popup">
                <h2 class="cart-popup-title">장바구니 담기</h2>
                <p class="cart-popup-product">상품 정보를 확인해 주세요.</p>
                <div class="cart-form">
                    <div class="cart-field"><label for="cartPriceInput">총 가격</label><input type="text" id="cartPriceInput" inputmode="numeric" placeholder="총 가격" readonly /></div>
                    <div class="cart-field">
                        <label for="cartCountInput">갯수</label>
                        <div class="cart-count-control">
                            <input type="number" id="cartCountInput" min="1" value="1" placeholder="갯수를 입력하세요" />
                            <div class="cart-stepper" aria-hidden="true"><button type="button" class="count-up-btn" tabindex="-1">▲</button><button type="button" class="count-down-btn" tabindex="-1">▼</button></div>
                        </div>
                    </div>
                </div>
                <div class="cart-popup-actions"><button type="button" class="cart-add-btn">장바구니</button><button type="button" class="cart-buy-btn">구매하기</button></div>
            </div>
        `;
        app.appendChild(modal);
    };

    let selectedProduct = null;

    const openCartPopup = (button) => {
        const productCard = button.closest(".product-card, .recommend-product-card");
        if (!productCard) return;
        const name = $("h3", productCard)?.textContent.trim();
        const priceText = $(".recommend-product-info p, .product-card p", productCard)?.textContent || $("p", productCard)?.textContent;
        const unitPrice = getNumberOnly(priceText);
        const img = $("img", productCard)?.src;
        if (!name || !unitPrice || !img) return;
        selectedProduct = { name, unitPrice, img };
        $(".cart-popup-product").textContent = `${name} · 개당 ${formatWon(unitPrice)}`;
        $("#cartCountInput").value = 1;
        $("#cartPriceInput").value = formatWon(unitPrice);
        $("#globalCartModal").classList.add("show");
        $("#cartCountInput").focus();
    };

    const closeCartPopup = () => {
        const modal = $("#globalCartModal");
        if (modal) modal.classList.remove("show");
        selectedProduct = null;
    };

    const updateCartModalPrice = () => {
        if (!selectedProduct) return;
        const input = $("#cartCountInput");
        const count = Math.max(1, Number(input.value) || 1);
        input.value = count;
        $("#cartPriceInput").value = formatWon(selectedProduct.unitPrice * count);
    };

    const setupCartModalEvents = () => {
        document.addEventListener("click", (e) => {
            const cartButton = e.target.closest(".cart-btn");
            if (cartButton) openCartPopup(cartButton);

            if (e.target.closest(".count-up-btn")) {
                const input = $("#cartCountInput");
                input.value = Number(input.value || 1) + 1;
                updateCartModalPrice();
            }
            if (e.target.closest(".count-down-btn")) {
                const input = $("#cartCountInput");
                input.value = Math.max(1, Number(input.value || 1) - 1);
                updateCartModalPrice();
            }
            if (e.target.closest(".cart-add-btn")) {
                if (!selectedProduct) return;
                addItemToCart({ ...selectedProduct, count: Math.max(1, Number($("#cartCountInput").value) || 1) });
                closeCartPopup();
            }
            if (e.target.closest(".cart-buy-btn")) {
                if (!selectedProduct) return;
                const count = Math.max(1, Number($("#cartCountInput").value) || 1);
                localStorage.setItem(CHECKOUT_KEY, JSON.stringify([{ ...selectedProduct, count, selected: true }]));
                location.href = "checkout.html";
            }
            if (e.target.id === "globalCartModal") closeCartPopup();
        });
        document.addEventListener("input", (e) => {
            if (e.target && e.target.id === "cartCountInput") updateCartModalPrice();
        });
        document.addEventListener("change", (e) => {
            if (e.target && e.target.id === "cartCountInput") updateCartModalPrice();
        });
    };

    const makeDragScroll = (scrollBox) => {
        if (!scrollBox) return;
        scrollBox.querySelectorAll("img").forEach((img) => img.setAttribute("draggable", "false"));
        let isDown = false;
        let isHorizontal = false;
        let startX = 0;
        let startY = 0;
        let startScrollLeft = 0;

        scrollBox.addEventListener("pointerdown", (e) => {
            isDown = true;
            isHorizontal = false;
            startX = e.pageX;
            startY = e.pageY;
            startScrollLeft = scrollBox.scrollLeft;
        });
        scrollBox.addEventListener("pointermove", (e) => {
            if (!isDown) return;
            const moveX = e.pageX - startX;
            const moveY = e.pageY - startY;
            if (!isHorizontal && Math.abs(moveY) > Math.abs(moveX) && Math.abs(moveY) > 6) {
                isDown = false;
                scrollBox.classList.remove("is-dragging");
                return;
            }
            if (!isHorizontal && Math.abs(moveX) > Math.abs(moveY) && Math.abs(moveX) > 6) {
                isHorizontal = true;
                scrollBox.classList.add("is-dragging");
                scrollBox.setPointerCapture?.(e.pointerId);
            }
            if (!isHorizontal) return;
            e.preventDefault();
            scrollBox.scrollLeft = startScrollLeft - moveX;
        });
        const stop = () => {
            isDown = false;
            isHorizontal = false;
            scrollBox.classList.remove("is-dragging");
        };
        scrollBox.addEventListener("pointerup", stop);
        scrollBox.addEventListener("pointerleave", stop);
        scrollBox.addEventListener("pointercancel", stop);
    };

    const setupTopButton = (scrollEl, button) => {
        if (!scrollEl || !button) return;
        let fading = false;
        scrollEl.addEventListener("scroll", () => {
            if (fading) return;
            button.classList.toggle("show", scrollEl.scrollTop > 260);
        });
        button.addEventListener("click", () => {
            fading = true;
            button.classList.add("is-fading");
            scrollEl.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
                button.classList.remove("show", "is-fading");
                fading = false;
            }, 350);
        });
    };

    document.addEventListener("DOMContentLoaded", () => {
        window.renderHeader?.(window.UTBT_HEADER || {});
        window.renderBottomNav?.(window.UTBT_PAGE || "home");
        createCartModal();
        setupCartModalEvents();
        updateCartCount();
        $$(".horizontal-list").forEach(makeDragScroll);
        setupTopButton($(".mobile-app"), $(".scroll-top-btn"));
    });

    window.UTBT = {
        $, $$, CART_KEY, CHECKOUT_KEY, ADDRESS_KEY,
        formatWon, getNumberOnly, getCartItems, setCartItems, updateCartCount,
        addItemToCart, productCardHTML, getAddress, setAddress, getAddressHTML,
        makeDragScroll
    };
})();
