document.addEventListener("DOMContentLoaded", () => {
    const { products, recipes } = window.UTBT_DATA;
    const { $, $$, productCardHTML, makeDragScroll } = window.UTBT;
    const groups = {
        user: products.slice(0, 4),
        rescue: products.slice(4, 8),
        season: products.filter((p) => p.tags.includes("제철") || p.tags.includes("사과") || p.tags.includes("귤")).slice(0, 4),
        popular: products.slice(8, 12),
        meal: products.filter((p) => p.tags.includes("밀키트")).slice(0, 4)
    };
    $$(".recommend-scroll").forEach((list) => {
        const groupName = list.dataset.group;
        list.innerHTML = groups[groupName].map((p) => productCardHTML(p, "recommend-product-card")).join("");
    });
    $(".recipe-scroll").innerHTML = recipes.map((item, index) => `
        <li class="recipe-card" data-recipe-index="${index}" tabindex="0" role="button" aria-label="${item.name} 레시피 보기">
            <div class="recipe-img"><img src="${item.img}" alt="${item.name}" /></div>
            <p class="recipe-name">${item.name}</p>
            <p class="recipe-label">주요 재료</p>
            <p class="recipe-desc">${item.desc}</p>
            <p class="recipe-label">특징</p>
            <p class="recipe-desc">못난이 식재료 활용 레시피</p>
        </li>
    `).join("");
    $$(".horizontal-list").forEach(makeDragScroll);

    const openRecipePopup = (recipe) => {
        $(".recipe-popup-title").textContent = recipe.name;
        $(".recipe-popup-sub").textContent = "간략한 레시피를 확인해 보세요.";
        $(".recipe-popup-ingredients").textContent = recipe.desc;
        $(".recipe-step-list").innerHTML = recipe.steps.map((step) => `<li>${step}</li>`).join("");
        $(".recipe-modal").classList.add("show");
    };
    const closeRecipePopup = () => $(".recipe-modal").classList.remove("show");
    $(".recipe-scroll").addEventListener("click", (e) => {
        const card = e.target.closest(".recipe-card");
        if (!card) return;
        openRecipePopup(recipes[Number(card.dataset.recipeIndex)]);
    });
    $(".recipe-scroll").addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const card = e.target.closest(".recipe-card");
        if (!card) return;
        e.preventDefault();
        openRecipePopup(recipes[Number(card.dataset.recipeIndex)]);
    });
    $(".recipe-close-btn").addEventListener("click", closeRecipePopup);
    $(".recipe-modal").addEventListener("click", (e) => { if (e.target === $(".recipe-modal")) closeRecipePopup(); });
});
