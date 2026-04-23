// $(function () {
//     $("footer .inner .family .list").hide();
//     $("button").click(function () {
//         $(".list").slideToggle();
//     });
// });

let btn = document.querySelector("#btn");
let libox = document.querySelector("#listbox");

btn.addEventListener("click", function () {
    libox.classList.toggle("on");
});
