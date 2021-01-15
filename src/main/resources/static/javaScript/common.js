function inputAnimation() {
    var inputs = $(".common-input");
    var interval = 300;
    inputs.focus(function (event) {
        $(this).siblings("label").stop().animate({"bottom": "30px", "fontSize": "14px"}, interval);

        $(this).next(".common-line").stop().animate(
            {"width": $(this.parentNode).width()}, interval);
    });

    inputs.blur(function (event) {
        if (this.value === "") {
            $(this).siblings("label").stop().animate({"bottom": "4px", "fontSize": "20px"}, interval);
        }
        $(this).next(".common-line").stop().animate({"width": "0"}, interval);
    });
}

function cometsShow() {
    var stars = $("#stars");
    var stars_width = stars.innerWidth();
    var stars_height = stars.innerHeight();
    document.cometTimer = setInterval(function () {
        generateComets(stars_width, stars_height);
    }, 1000);
}

function generateComets(stars_width, stars_height) {
    for (var i = 0; i < 2; i++) {
        var star = document.createElement("div");
        star.className = "star";
        var left = randomDistance(stars_width - 100, 100);
        var top = randomDistance(stars_height / 5, 10);
        star.style.left = left + "px";
        star.style.top = top + "px";
        star.style.transform = 'rotate(- ' + randomDistance(45, 20) + "deg) scale(" +
            randomDistance(0.8, 0.3) + ")";
        var distance = randomDistance(300, 250);
        var timer = randomDistance(2000, 1000);
        $("#stars").prepend(star);
        top = top + distance - 50;
        left = left - distance + 50;

        var timer_left = (50.0 / (distance - 50)) * timer;

        $(star).animate({
            "opacity": "0.8",
            // "top" : "+=" + distance + "px",
            // "left" : "-=" + distance + "px"
            "top": top + "px",
            "left": left + "px"
        }, timer, "linear").animate({
            "opacity": "0",
            "top": (top + 50) + "px",
            "left": (left - 50) + "px"
        }, timer_left, "linear", function () {
            this.parentNode.removeChild(this);
        });
    }

}

function randomDistance(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function pageToggle() {
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    document.addEventListener(visibilityChange, function () {
        if (document[hidden] === true){
            clearInterval(document.cometTimer);
        }
        else{
            cometsShow();
        }
    });
}

function positionFollowing(obj, tar, x){
    obj = obj.get(0);
    tar = $(tar).get(0);
    obj.style.left = tar.offsetLeft + tar.offsetWidth +x + "px";
    obj.style.top = tar.offsetTop - (tar.offsetHeight / 2) + "px";
}