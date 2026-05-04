document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".alarm-switch").forEach((switchBtn) => {
        switchBtn.addEventListener("click", () => {
            const row = switchBtn.closest(".alarm-row");
            const itemName = row.querySelector(".alarm-item-name span:last-child").textContent;
            const stateText = row.querySelector(".alarm-state-text");
            const nextOn = !switchBtn.classList.contains("is-on");
            switchBtn.classList.toggle("is-on", nextOn);
            switchBtn.classList.toggle("just-toggled-off", !nextOn);
            row.classList.toggle("is-on", nextOn);
            stateText.textContent = nextOn ? "알림끄기" : "알림설정";
            switchBtn.setAttribute("aria-pressed", String(nextOn));
            switchBtn.setAttribute("aria-label", `${itemName} 알림 ${nextOn ? "켜짐" : "꺼짐"}`);
        });
        switchBtn.addEventListener("mouseleave", () => switchBtn.classList.remove("just-toggled-off"));
    });
});
