//btn
let btn1 = document.querySelector("#btn1");
console.log(btn1);
let btn2 = document.querySelector("#btn2");
let btn3 = document.querySelector("#btn3");
let btn4 = document.querySelector("#btn4");
let btn5 = document.querySelector("#btn5");
let btn6 = document.querySelector("#btn6");
let btn7 = document.querySelector("#btn7");
let btn8 = document.querySelector("#btn8");

//box
let fadebox = document.querySelector("#fadebox");
console.log(fadebox);
let fadetogglebox = document.querySelector("#fadetogglebox");
let upbox = document.querySelector("#up");
let slidetgbox = document.querySelector("#slidetogglebox");
let anibox = document.querySelector("#anim");

// btn1을 클릭하면 fadebox를 부드럽게 사라지게
btn1.addEventListener("click", function () {
    fadebox.style.transition = " all is";
    fadebox.style.opacity = 0;
    fadebox.style.display = "none";
});

btn2.addEventListener("click", function () {
    fadebox.style.transition = " all is";
    fadebox.style.opacity = 1;
    fadebox.style.display = "block";
});

btn3.addEventListener("click", function () {
    fadetogglebox.classList.toggle("fade-hidden");
});

btn4.addEventListener("click", function () {
    upbox.classList.add("slide-hidden");
});
btn5.addEventListener("click", function () {
    upbox.classList.remove("slide-hidden");
});

btn6.addEventListener("click", function () {
    slidetgbox.classList.toggle("slide-hidden");
});

btn7.addEventListener("click", function () {
    anibox.classList.add("ani-move");
});
btn8.addEventListener("click", function () {
    anibox.classList.remove("ani-move");
});
