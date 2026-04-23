//btn
let btn1 = document.querySelector("#btn1");
console.log(btn1);
let btn2 = document.querySelector("#btn2");
let btn3 = document.querySelector("#btn3");
let btn4 = document.querySelector("#btn4");

//box
let fadebox = document.querySelector("#fadebox");
console.log(fadebox);
let fadetogglebox = document.querySelector("#fadetogglebox");
let upbox = document.querySelector("#up");

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
