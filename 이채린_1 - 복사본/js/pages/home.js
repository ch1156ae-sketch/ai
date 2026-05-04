document.addEventListener("DOMContentLoaded", () => {
    const { products, categories } = window.UTBT_DATA;
    const { $, productCardHTML, makeDragScroll } = window.UTBT;

    $("#homeCategoryList").innerHTML = categories.map((category) => `
        <li><a href="category.html" aria-label="${category.label}"><span class="category-img"><img src="${category.img}" alt="" /></span></a></li>
    `).join("");

    $("#rescueProductList").innerHTML = products.slice(0, 8).map((p) => productCardHTML(p)).join("");
    $("#bestProductList").innerHTML = products.slice(8, 18).map((p) => productCardHTML(p)).join("");
    $("#mealKitProductList").innerHTML = products.filter((p) => p.tags.includes("밀키트")).map((p) => productCardHTML(p)).join("");
    document.querySelectorAll(".horizontal-list").forEach(makeDragScroll);

    const heroSlider = $(".hero-slider");
    const heroTrack = $(".hero-track");
    const heroCurrent = $(".hero-current");
    const heroTotal = $(".hero-total");
    const heroPauseBtn = $(".hero-pause-btn");
    const originalLength = heroTrack.children.length;
    const first = heroTrack.firstElementChild.cloneNode(true);
    const last = heroTrack.lastElementChild.cloneNode(true);
    let index = 1;
    let timer = null;
    let paused = false;
    heroTotal.textContent = originalLength;
    first.setAttribute("aria-hidden", "true");
    last.setAttribute("aria-hidden", "true");
    heroTrack.appendChild(first);
    heroTrack.insertBefore(last, heroTrack.firstElementChild);
    heroTrack.querySelectorAll("img").forEach((img) => img.setAttribute("draggable", "false"));

    const updatePage = () => {
        let current = index;
        if (index === 0) current = originalLength;
        if (index === originalLength + 1) current = 1;
        heroCurrent.textContent = current;
    };
    const move = (useTransition = true) => {
        heroTrack.classList.toggle("no-transition", !useTransition);
        heroTrack.style.transform = `translateX(-${index * 100}%)`;
        updatePage();
    };
    const start = () => {
        clearInterval(timer);
        if (paused) return;
        timer = setInterval(() => { index += 1; move(true); }, 3000);
    };
    heroPauseBtn.addEventListener("click", () => {
        paused = !paused;
        heroPauseBtn.textContent = paused ? "▶" : "Ⅱ";
        paused ? clearInterval(timer) : start();
    });
    heroTrack.addEventListener("transitionend", () => {
        if (index === originalLength + 1) { index = 1; move(false); }
        if (index === 0) { index = originalLength; move(false); }
    });

    let down = false, horizontal = false, startX = 0, startY = 0, moveX = 0;
    heroSlider.addEventListener("pointerdown", (e) => { down = true; horizontal = false; startX = e.pageX; startY = e.pageY; moveX = 0; clearInterval(timer); });
    heroSlider.addEventListener("pointermove", (e) => {
        if (!down) return;
        moveX = e.pageX - startX;
        const moveY = e.pageY - startY;
        if (!horizontal && Math.abs(moveY) > Math.abs(moveX) && Math.abs(moveY) > 6) { down = false; start(); return; }
        if (!horizontal && Math.abs(moveX) > Math.abs(moveY) && Math.abs(moveX) > 6) { horizontal = true; heroSlider.classList.add("is-dragging"); heroSlider.setPointerCapture?.(e.pointerId); }
        if (!horizontal) return;
        e.preventDefault();
        const movePercent = (moveX / heroSlider.clientWidth) * 100;
        heroTrack.classList.add("no-transition");
        heroTrack.style.transform = `translateX(calc(-${index * 100}% + ${movePercent}%))`;
    });
    const stop = () => {
        if (!down) return;
        const threshold = heroSlider.clientWidth * 0.18;
        if (horizontal) {
            if (moveX < -threshold) index += 1;
            if (moveX > threshold) index -= 1;
            move(true);
        }
        down = false; horizontal = false; moveX = 0; heroSlider.classList.remove("is-dragging"); start();
    };
    heroSlider.addEventListener("pointerup", stop);
    heroSlider.addEventListener("pointerleave", stop);
    heroSlider.addEventListener("pointercancel", stop);
    move(false);
    start();
});
