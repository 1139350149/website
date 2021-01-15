$(document).ready(function () {
    window.flag = [-1, -1, -1, -1, -1, -1];
    inputAnimation();
    cometsShow();
    pageToggle();
    verifyingInfo();
    showRegisterHint();
    submitCheck();
    getVerifyCode();
});

$(window).resize(function () {
    clearInterval(document.cometTimer);
    cometsShow();
});

function verifyingInfo() {
    $("#username").on("change", function () {
        var target = $("#username-hint");
        userNameUniquenessVerification(this.value);
        // console.log(window.flag);
        switch (window.flag[0]) {
            case 0: {
                target.find(".hint-icon").attr("src", "/resource/correct.png");
                target.find(".hint-content").text("合格的用户名");
                break;
            }
            case -1: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("用户名不能为空");
                break;
            }
            case -2: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("用户名已被使用");
                break;
            }
            case -3: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("网络连接失败");
                break;
            }
        }
        $(target).removeClass("hide-condition");
        submitConditionChange();
    });

    $("#email").on("change", function () {
        var target = $("#email-hint");
        emailFormatVerification(this.value);
        switch (window.flag[1]) {
            case 0: {
                target.find(".hint-icon").attr("src", "/resource/correct.png");
                target.find(".hint-content").text("我们将会向您发送一封邮件");
                break;
            }
            case -1: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("此项是必填项，不可以空缺");
                break;
            }
            case -2: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("无效的电子邮件地址");
                break;
            }
            case -3: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("网络连接失败");
                break;
            }
            case -4: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("已被注册的电子邮箱地址");
                break;
            }
        }
        $(target).removeClass("hide-condition");
        submitConditionChange();
    });

    $("#password").on("change", function () {
        $("#confirm_password").change();
        var target = $("#password-hint");
        window.flag[2] = passwordFormatVerification(this.value);
        switch (window.flag[2]) {
            case 0: {
                target.find(".hint-icon").attr("src", "/resource/correct.png");
                target.find(".hint-content").text("密码有效");
                break;
            }
            case -1: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("密码不能为空");
                break;
            }
            case -2: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("密码过长或过短");
                break;
            }
            case -3: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("密码格式有误");
                break;
            }
        }
        $(target).removeClass("hide-condition");
        submitConditionChange();
    });

    $("#confirm_password").on("change", function () {
        var target = $("#confirm-password-hint");
        if (this.value === null || this.value === "") {
            window.flag[3] = -1;
            target.find(".hint-icon").attr("src", "/resource/error.png");
            target.find(".hint-content").text("此项是必填项，不可以空缺");
        }

        if (this.value === $("#password").val()) {
            window.flag[3] = 0;
            target.find(".hint-icon").attr("src", "/resource/correct.png");
            target.find(".hint-content").text("密码匹配");
        } else {
            window.flag[3] = -2;
            target.find(".hint-icon").attr("src", "/resource/error.png");
            target.find(".hint-content").text("密码不匹配");
        }
        $(target).removeClass("hide-condition");
        submitConditionChange();
    });

    $("#register-code").on("change", function () {
        var target = $("#register-code-hint");
        registerCodeVerification(this.value);
        // console.log(window.flag);
        switch (window.flag[4]) {
            case 0: {
                target.find(".hint-icon").attr("src", "/resource/correct.png");
                target.find(".hint-content").text("注册码有效");
                break;
            }
            case -1: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("注册码不能为空");
                break;
            }
            case -2: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("注册码已被使用了");
                break;
            }
            case -3: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("注册码不存在");
                break;
            }
            case -4: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("网络连接失败");
                break;
            }
        }
        $(target).removeClass("hide-condition");
        submitConditionChange();
    });

    $("#verify-code").on("change", function () {
        var target = $("#verify-code-hint");
        verifyCodeVerification(this.value);
        // console.log(window.flag);
        switch (window.flag[5]) {
            case 0: {
                target.find(".hint-icon").attr("src", "/resource/correct.png");
                target.find(".hint-content").text("验证码正确");
                break;
            }
            case -2: {
                target.find(".hint-icon").attr("src", "/resource/error.png");
                target.find(".hint-content").text("验证码错误");
                break;
            }
        }
        $(target).removeClass("hide-condition");
        submitConditionChange();
    });
}

function emailFormatVerification(val) {
    if (val === null || val === "") {
        window.flag[1] = -1;
    }
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var domains = ["qq.com", "163.com", "vip.163.com", "263.net", "yeah.net", "sohu.com", "sina.cn", "sina.com", "eyou.com", "gmail.com", "hotmail.com", "42du.cn"];
    if (pattern.test(val)) {
        var domain = val.substring(val.indexOf("@") + 1);
        for (var i = 0; i < domains.length; i++) {
            if (domain === domains[i]) {
                $.ajax({
                    url: "emailExistence",
                    type: "post",
                    data: "email=" + val,
                    dataType: "json",
                    async: false,
                    error: function (data) {
                        // console.log("Error! Can not send request");
                        // TGTool().error("Error! Can not send request");
                        window.flag[1] = -3;
                    },
                    success: function (data) {
                        window.flag[1] = data.flag;
                    }
                });
            }
        }
    } else {
        window.flag[1] = -2;
    }
}

function passwordFormatVerification(val) {
    if (val === null || val === "") {
        return -1;
    }
    if (val.length < 6 || val.length > 20) {
        return -2;
    } else {
        var pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (pattern.test(val)) {
            return 0;
        }
        return -3;
    }
}

function isDigit(val) {
    // console.log(val);
    var pattern = /^[0-9]{1,3}$/;
    if (pattern.test(val)) {
        return 0;
    }
    return -1;
}

function userNameUniquenessVerification(val) {
    // console.log(val);
    if (val === null || val === "") {
        window.flag[0] = -1;
        return;
    }
    // var tg = TGTool();
    $.ajax({
        url: "usernameExistence",
        type: "post",
        data: "username=" + val,
        dataType: "json",
        async: false,
        error: function (data) {
            // console.log("Error! Can not send request");
            // tg.error("Error! Can not send request");
            window.flag[0] = -3;
        },
        success: function (data) {
            window.flag[0] = data.flag;
        }
    });
}

function registerCodeVerification(val) {
    // console.log(val);
    if (val === null || val === "") {
        window.flag[4] = -1;
        return;
    }
    // var tg = TGTool();
    $.ajax({
        url: "registerCodeExistence",
        type: "post",
        data: "registerCode=" + val,
        dataType: "json",
        async: false,
        error: function (data) {
            // console.log("Error! Can not send request");
            // tg.error("Error! Can not send request");
            window.flag[4] = -4;
        },
        success: function (data) {
            window.flag[4] = data.flag;
        }
    })
}

function allClear(val) {
    return (val[0] + val[1] + val[2] + val[3] + val[5] === 0);
}

function showRegisterHint() {
    var submitBtn = $("#register-submit");
    var submitHint = $("#submit-hint");
    // positionFollowing(submitHint, this, 20);
    submitBtn.on("mouseenter", function () {
        positionFollowing(submitHint, this, 20);
        submitHint.fadeIn();
    });

    submitBtn.on("mouseleave", function () {
        positionFollowing(submitHint, this, 20);
        submitHint.fadeOut();
    });
}

function submitCheck() {
    var submitBtn = $("#register-submit");
    submitBtn.on("mouseenter", function () {
        $(this).css("background-color", "grey");
    });
    submitBtn.on("mouseleave", function () {
        $(this).css("background-color", "rgb(106, 157, 103)");
    });
    submitBtn.on("click", function () {
        if (!allClear(window.flag)) {
            return false;
        }
    })
}

function submitConditionChange() {
    var registerSubmit = $("#register-submit");
    if (allClear(flag)) {
        registerSubmit.css("cursor", "pointer");
        registerSubmit.off("mouseenter", changeDeepSkyBlue);
        registerSubmit.off("mouseenter", changeGray);
        registerSubmit.on("mouseenter", function () {
            changeDeepSkyBlue(this);
        });
        $("#submit-hint").text("已满足注册条件，可以注册");
    } else {
        registerSubmit.css("mouseenter", "not-allowed");
        registerSubmit.off("mouseenter", changeDeepSkyBlue);
        registerSubmit.off("mouseenter", changeGray);
        registerSubmit.on("mouseenter", function () {
            changeGray(this);
        });
        $("#submit-hint").text("当前不满足注册条件!");
    }
}

function changeDeepSkyBlue(val) {
    $(val).css("background-color", "deepskyblue");
}

function changeGray(val) {
    $(val).css("background-color", "grey");
}

function getVerifyCode() {
    var email = $("#email");
    var button = $("#get-code");
    // var tg = TGTool();
    button.on("click", function () {
        if (window.flag[1] === 0) {
            var params = {};
            params.email_add = email.val();
            //ajax的type,url,dataType,contentType,data属性
            $.ajax({
                async: false,
                cache: false,
                type: 'POST',
                url: 'sendMail',   //后台收到请求加以处理
                dataType: "json",
                data: params,
                error: function (data) {    //后台返回值就是data  带有result等属性 一般是Map
                    // toast({time: 3000, msg: "Error! Can not send mail." + data.result, type: 'default'});
                    // tg.error("Error! Can not send mail.");
                },
                success: function (data) {
                    // toast({time: 3000, msg: data.result, type: 'default'});  //弹出正确窗口
                    // tg.success(data.result);
                    window.real_pass = data.key;   //设置验证码赋值给real_pass
                }
            });
            var time = 30;
            $("#get-code").attr("disabled", true).css("pointer-events", "none").css("cursor", "not-allowed");
            var timerH = setInterval(function () {
                if (time === 0) {
                    $("#get-code").removeAttr("disabled").css("pointer-events", "auto").css("cursor", "pointer");
                    $("#get-code").html("重新获取验证码");
                    clearInterval(timerH);
                } else {
                    $("#get-code").html("(" + time + ")s");
                    time--;
                }
            }, 1000);
        } else if (window.flag[1] === -1) {
            // toast({time: 3000, msg: "邮箱不能为空", type: 'default'});
            // tg.error("邮箱不能为空");
        } else {
            // toast({time: 3000, msg: "无效的邮箱地址", type: 'default'});
            // tg.error("无效的邮箱地址");
        }
    });
}

function verifyCodeVerification(val) {
    if (val === "" || val === null) {
        window.flag[5] = -2;
    } else if (val.toLowerCase() === window.real_pass) {
        window.flag[5] = 0;
    } else {
        window.flag[5] = -2;
    }
}