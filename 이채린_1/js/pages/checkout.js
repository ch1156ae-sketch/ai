document.addEventListener("DOMContentLoaded", () => {
    const { coupons } = window.UTBT_DATA;
    const { $, $$, CHECKOUT_KEY, formatWon, getAddressHTML } = window.UTBT;
    let checkoutItems = [];
    try { checkoutItems = JSON.parse(localStorage.getItem(CHECKOUT_KEY)) || []; } catch { checkoutItems = []; }
    if (checkoutItems.length === 0) {
        $(".buy-page-content").innerHTML = `<section class="buy-card"><h2 class="buy-section-title">구매할 상품이 없습니다.</h2><p class="buy-label">장바구니에서 상품을 선택해 주세요.</p></section>`;
        return;
    }

    let checkoutMethod = "카드결제";
    let selectedCouponIndex = 0;
    let tempCouponIndex = 0;
    const ownedPointAmount = 3000;
    const POINT_UNIT = 1000;

    const getProductTotal = () => checkoutItems.reduce((sum, item) => sum + item.unitPrice * item.count, 0);
    const getCouponDiscountAmount = (coupon, productTotal) => {
        if (coupon.type === "rate") return Math.floor(productTotal * coupon.value);
        if (coupon.type === "fixed") return Math.min(productTotal, coupon.value);
        return 0;
    };
    const getBestCouponIndex = () => {
        const total = getProductTotal();
        let bestIndex = 0;
        let bestDiscount = -1;
        coupons.forEach((coupon, index) => {
            const discount = getCouponDiscountAmount(coupon, total);
            if (discount > bestDiscount) { bestDiscount = discount; bestIndex = index; }
        });
        return bestIndex;
    };
    const normalizePointAmount = (value, maxPoint) => Math.min(Math.floor(Math.max(0, Number(value) || 0) / POINT_UNIT) * POINT_UNIT, Math.floor(Math.max(0, maxPoint) / POINT_UNIT) * POINT_UNIT);
    const calculate = () => {
        const productTotal = getProductTotal();
        const couponDiscount = getCouponDiscountAmount(coupons[selectedCouponIndex], productTotal);
        const maxPoint = Math.min(ownedPointAmount, Math.max(0, productTotal - couponDiscount));
        const pointUse = normalizePointAmount($(".buy-point-input").value, maxPoint);
        const finalTotal = Math.max(0, productTotal - couponDiscount - pointUse);
        return { productTotal, couponDiscount, pointUse, finalTotal, benefit: Math.floor(finalTotal * 0.01) };
    };
    const updateSummary = () => {
        const { productTotal, couponDiscount, pointUse, finalTotal, benefit } = calculate();
        $(".buy-product-total").textContent = formatWon(productTotal);
        $(".buy-coupon-discount").textContent = `-${formatWon(couponDiscount)}`;
        $(".buy-point-discount").textContent = `-${formatWon(pointUse)}`;
        $(".buy-final-total").textContent = formatWon(finalTotal);
        $(".buy-benefit-text").textContent = `적립 혜택: 결제 완료 시 ${formatWon(benefit)} 적립 예정이에요.`;
    };
    const render = () => {
        $(".buy-address-text").innerHTML = getAddressHTML();
        $(".buy-owned-point").textContent = formatWon(ownedPointAmount);
        selectedCouponIndex = getBestCouponIndex();
        $(".buy-coupon-name").textContent = coupons[selectedCouponIndex].name;
        $(".buy-item-list").innerHTML = checkoutItems.map((item) => `<li class="buy-item"><div class="buy-item-img"><img src="${item.img}" alt="${item.name}" /></div><div><p class="buy-item-name">${item.name} · ${item.count}개</p><p class="buy-item-price">${formatWon(item.unitPrice * item.count)}</p></div></li>`).join("");
        updateSummary();
    };
    const getCouponDesc = (coupon) => {
        if (coupon.type === "rate") return `상품 금액 ${Math.round(coupon.value * 100)}% 할인`;
        if (coupon.type === "fixed") return `${formatWon(coupon.value)} 할인`;
        return "쿠폰을 적용하지 않아요";
    };
    const renderCouponList = () => {
        const bestCouponIndex = getBestCouponIndex();
        $(".coupon-list").innerHTML = coupons.map((coupon, index) => `<li><button type="button" class="coupon-item ${index === tempCouponIndex ? "is-selected" : ""}" data-coupon-index="${index}" aria-label="${coupon.name} 선택"><span><span class="coupon-name">${coupon.name}</span><span class="coupon-desc">${getCouponDesc(coupon)}</span>${index === bestCouponIndex ? `<span class="coupon-best-badge">최대할인 적용</span>` : ""}</span><span class="coupon-check" aria-hidden="true"></span></button></li>`).join("");
    };
    const updatePointGuide = () => {
        const value = Math.max(0, Number($(".buy-point-input").value) || 0);
        $(".buy-point-guide").classList.toggle("show", value > 0 && value % POINT_UNIT !== 0);
    };

    $(".buy-coupon-btn").addEventListener("click", () => { selectedCouponIndex = getBestCouponIndex(); tempCouponIndex = selectedCouponIndex; renderCouponList(); $(".coupon-modal").classList.add("show"); });
    $(".coupon-list").addEventListener("click", (e) => { const button = e.target.closest(".coupon-item"); if (!button) return; tempCouponIndex = Number(button.dataset.couponIndex); renderCouponList(); });
    $(".coupon-close-btn").addEventListener("click", () => $(".coupon-modal").classList.remove("show"));
    $(".coupon-use-btn").addEventListener("click", () => { selectedCouponIndex = tempCouponIndex; $(".buy-coupon-name").textContent = coupons[selectedCouponIndex].name; updateSummary(); $(".coupon-modal").classList.remove("show"); });
    $(".buy-point-input").addEventListener("input", () => { updatePointGuide(); updateSummary(); });
    $(".buy-point-input").addEventListener("change", () => { const { productTotal, couponDiscount } = calculate(); const maxPoint = Math.min(ownedPointAmount, Math.max(0, productTotal - couponDiscount)); $(".buy-point-input").value = normalizePointAmount($(".buy-point-input").value, maxPoint); updatePointGuide(); updateSummary(); });
    $(".buy-point-all-btn").addEventListener("click", () => { const { productTotal, couponDiscount } = calculate(); const maxPoint = Math.min(ownedPointAmount, Math.max(0, productTotal - couponDiscount)); $(".buy-point-input").value = normalizePointAmount(maxPoint, maxPoint); updatePointGuide(); updateSummary(); });
    $$(".buy-method-btn").forEach((button) => button.addEventListener("click", () => { checkoutMethod = button.dataset.method; $$(".buy-method-btn").forEach((btn) => btn.classList.toggle("active", btn === button)); }));
    $(".buy-address-change-btn").addEventListener("click", () => location.href = "cart.html");
    $(".buy-submit-btn").addEventListener("click", () => { localStorage.removeItem(CHECKOUT_KEY); location.href = "complete.html"; });
    render();
});
