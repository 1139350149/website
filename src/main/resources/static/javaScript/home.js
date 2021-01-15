$(document).ready(
    function () {
        paintBackground();
        initCard();
    }
);

$(window).resize(
    function () {
        paintBackground();
    }
);

function paintBackground () {
    var body = $(".head");
    var background = $("#background");
    background.width(0);
    background.height(0);
    var headWidth = body.outerWidth();
    var headHeight = body.outerHeight();
    background.css("border-color", "transparent #d3d3d3");
    background.css("border-width", "0 0 " + headHeight + "px " + headWidth + "px");
    background.css("border-style", "solid");
}

function initCard(){
    var cards = $(".card");
    cards.each(function () {
        $(this).css("border", "none");
    })
}

