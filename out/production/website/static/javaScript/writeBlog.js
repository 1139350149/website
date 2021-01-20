$(document).ready(function () {
    var title = $("#title");
    var editorBody = $("#editor-body");

    var titlePreview = $("#title-preview");
    var content = $("#content");

    var area = $("#body");

    editorFunction();

    asyncTitle(title, titlePreview);

    asyncBody(editorBody, content, area);
});

function getTime() {
    var d = new Date();

    return d.getFullYear() + "/" + (d.getMonth() + 1)
        + "/" + d.getDate() + " " + d.getHours() + ":" +
        d.getMinutes() + ":" + d.getSeconds();
}

function asyncTitle(title, titlePreview) {
    title.on("input", function () {
        titlePreview.text(title.val());
    });

    title.on("change", asyncTimeStamp);
}

function asyncBody(body, content, area) {
    body.on("input", function () {
        var bodyContent = body.html();
        asyncTimeStamp();
        content.html(bodyContent);
        area.html(bodyContent);
    });
}

function asyncTimeStamp() {
    var timeStamp = $("#time-stamp");
    timeStamp.text(getTime());
}

function editorCheck() {
    var title = $("#title");
    var body = $("#body");

    if(title.val().length ===0 || title.val().length > 30){
        toast("标题长度", "请输入或缩短标题！", "notice");
        return false;
    }

    if (body.val().length === 0 || body.val().length > 12000){
        toast("正文长度", "请输入或缩短正文！", "notice");
        return false;
    }

    return true;
}