document.addEventListener("DOMContentLoaded", () => {
    const { categoryDetailData } = window.UTBT_DATA;
    const { $, $$ } = window.UTBT;

    const categoryNames = Object.keys(categoryDetailData);

    let currentIndex = 0;
    let isAnimating = false;

    const sideList = $(".category-side-list");
    const detailGrid = $(".category-detail-grid");
    const gridWrap = $(".category-grid-wrap");

    sideList.innerHTML = categoryNames
        .map(
            (name, index) => `
                <button
                    type="button"
                    class="category-side-btn ${index === 0 ? "active" : ""}"
                    data-index="${index}"
                >
                    ${name}
                </button>
            `,
        )
        .join("");

    const renderDetails = () => {
        const name = categoryNames[currentIndex];

        detailGrid.innerHTML = categoryDetailData[name]
            .map(
                (item) => `
                    <li class="category-detail-card">
                        <span class="category-detail-img">
                            <img src="${item.img}" alt="${item.name}" />
                        </span>
                        <p>${item.name}</p>
                    </li>
                `,
            )
            .join("");

        $$(".category-side-btn").forEach((btn) => {
            btn.classList.toggle(
                "active",
                Number(btn.dataset.index) === currentIndex,
            );
        });
    };

    const setCategory = (nextIndex, direction = 1, animated = true) => {
        if (isAnimating || nextIndex === currentIndex) return;

        if (!animated) {
            currentIndex = nextIndex;
            renderDetails();
            return;
        }

        isAnimating = true;

        const outClass = direction > 0 ? "slide-out-up" : "slide-out-down";
        const enterClass =
            direction > 0 ? "slide-enter-up" : "slide-enter-down";

        gridWrap.classList.add(outClass);

        setTimeout(() => {
            currentIndex = nextIndex;
            renderDetails();

            gridWrap.classList.remove(outClass);
            gridWrap.classList.add(enterClass);

            gridWrap.offsetHeight;

            requestAnimationFrame(() => {
                gridWrap.classList.remove(enterClass);
            });

            setTimeout(() => {
                isAnimating = false;
            }, 300);
        }, 260);
    };

    sideList.addEventListener("click", (e) => {
        const button = e.target.closest(".category-side-btn");
        if (!button) return;

        const next = Number(button.dataset.index);
        setCategory(next, next > currentIndex ? 1 : -1, true);
    });

    let down = false;
    let vertical = false;
    let startX = 0;
    let startY = 0;
    let moveY = 0;

    gridWrap.addEventListener("pointerdown", (e) => {
        down = true;
        vertical = false;
        startX = e.pageX;
        startY = e.pageY;
        moveY = 0;
    });

    gridWrap.addEventListener("pointermove", (e) => {
        if (!down) return;

        const moveX = e.pageX - startX;
        moveY = e.pageY - startY;

        if (
            !vertical &&
            Math.abs(moveX) > Math.abs(moveY) &&
            Math.abs(moveX) > 6
        ) {
            down = false;
            return;
        }

        if (
            !vertical &&
            Math.abs(moveY) > Math.abs(moveX) &&
            Math.abs(moveY) > 12
        ) {
            vertical = true;
            gridWrap.classList.add("is-dragging");
            gridWrap.setPointerCapture?.(e.pointerId);
        }

        if (!vertical) return;
        e.preventDefault();
    });

    const stop = () => {
        if (vertical) {
            if (moveY < -60) {
                setCategory((currentIndex + 1) % categoryNames.length, 1, true);
            }

            if (moveY > 60) {
                setCategory(
                    (currentIndex - 1 + categoryNames.length) %
                        categoryNames.length,
                    -1,
                    true,
                );
            }
        }

        down = false;
        vertical = false;
        moveY = 0;
        gridWrap.classList.remove("is-dragging");
    };

    gridWrap.addEventListener("pointerup", stop);
    gridWrap.addEventListener("pointerleave", stop);
    gridWrap.addEventListener("pointercancel", stop);

    renderDetails();
});
