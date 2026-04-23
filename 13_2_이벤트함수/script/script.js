//jquery사용시 준비
$(function () {
    $("button").css("cursor", "pointer");
    //btn1를 클릭하면 .box에 첫번째 박스 부드럽게 사라지기
    $("#btn1").click(function () {
        $(".box1 div:first-child").fadeOut(1000);
    });
    // btn2를 클릭하면 .box
    $("#btn2").click(function () {
        $(".box1 div:first-child").fadeIn(1000);
    });
    $("#btn3").click(function () {
        $(".box1 div:last-child").fadeToggle();
    });
    $("#btn4").click(function () {
        $(".box2 div:first-child").slideUp();
    });
    $("#btn5").click(function () {
        $(".box2 div:first-child").slideDown();
    });
    $("#btn6").click(function () {
        $(".box2 div:nth-child(2)").slideToggle();
    });
    $("#btn7").click(function () {
        $(".box2 .ani").animate({ left: "840px" });
    });
    $("#btn8").click(function () {
        $(".box2 .ani").animate({ left: "440px" });
    });
    $("#btn9").click(function () {
        $(".box3 div:first-child").addClass("bg");
    });

    $("#btn10").click(function () {
        $(".box3 div:first-child").removeClass("bg");
    });
});
