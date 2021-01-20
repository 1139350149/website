$(document).ready(function () {
    inputAnimation();
    cometsShow();
    pageToggle();
    showHints();
    getValidationCodeImage();
    validationImgUpdate();
});

$(window).resize(function () {
    clearInterval(document.cometTimer);
    cometsShow();
});


function showHints() {
    var hints = $(".common-hint");

    var usernameHint = $("#username-hint");
    var passwordHint = $("#password-hint");
    var usernameHandle = null;
    var passwordHandle = null;
    var validationCode = $("#validation-code-input");
    var validationCodeHint = $("#validation-code-hint");
    hints.each(function () {
        if (hints.index(this) === 0) {
            $(this).on("mouseenter", function () {
                positionFollowing(usernameHint, this, 20);
                usernameHint.fadeIn();
            });

            $(this).on("mouseleave", function () {
                positionFollowing(usernameHint, this, 20);
                usernameHandle = setTimeout(function () {
                    usernameHint.fadeOut();
                }, 1000);
            });
        } else if (hints.index(this) === 1) {
            $(this).on("mouseenter", function () {
                positionFollowing(passwordHint, this, 20);
                passwordHint.fadeIn();
            });

            $(this).on("mouseleave", function () {
                positionFollowing(passwordHint, this, 20);
                passwordHandle = setTimeout(function () {
                    passwordHint.fadeOut();
                }, 1000);
            });
        }
        $(validationCode).on("change", function () {
            var code;

            $.ajax({
                async: false,
                url: "getJCCODE",
                type: 'GET',
                dataType: "json",
                error : function (data) {
                    // toast({time: 3000, msg: "Error! Can not connect to the server." + data.result, type: 'default'});
                    // TGTool().error("Error! Can not connect to the server.");
                },
                success: function (data) {
                    console.log(data);
                    code = data.jcode;
                    console.log(code);
                }
            });
            if (this.value.toLowerCase() === code) {
                validationCodeHint.find(".hint-icon").attr("src", "/resource/correct.png");
                validationCodeHint.find(".hint-content").text("验证码正确");
            } else {
                validationCodeHint.find(".hint-icon").attr("src", "/resource/error.png");
                validationCodeHint.find(".hint-content").text("验证码错误");
            }
            validationCodeHint.removeClass("hide-condition");
        })

    });

    usernameHint.on("mouseenter", function () {
        clearTimeout(usernameHandle);
        $(this).stop(true, false).fadeTo(500, 1);
    });

    usernameHint.on("mouseleave", function () {
        $(this).fadeOut();
    });

    passwordHint.on("mouseenter", function () {
        clearTimeout(passwordHandle);
        $(this).stop(true, false).fadeTo(500, 1)
    });

    passwordHint.on("mouseleave", function () {
        $(this).fadeOut();
    });
}

function getValidationCodeImage() {
    var img = $("#validation-image");
    // var tg = TGTool();
    $.ajax({
        async: true,
        type: 'GET',
        url: 'getValidateCode64',
        dataType: "json",
        error: function (data) {    //后台返回值就是data  带有result等属性 一般是Map
            // toast({time: 3000, msg: "Error! Can not connect to the server." + data.result, type: 'default'});
            // tg.error("Error! Can not connect to the server.");
        },
        success: function (data) {
            img.attr("src", data.url);
        }
    })
}

function validationImgUpdate() {
    var img = $("#validation-image");
    img.on("click", function () {
        getValidationCodeImage();
    });
}