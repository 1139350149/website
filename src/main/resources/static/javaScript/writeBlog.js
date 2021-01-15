$(document).ready(function () {
    var title = $("#title");
    var body = $("#body");

    var titlePreview = $("#title-preview");
    var content = $("#content");

    title.on("input", function () {
        titlePreview.text(title.val());
    });

    title.on("change", asyncTimeStamp);

    body.on("input", function () {
        var bodyContent = body.val();
        content.text("");
        var res = bodyContent.split("\n");
        for (var i in res){
            var newParagraph = $("<p class='paragraph'></p>");
            newParagraph.text(res[i]);
            content.append(newParagraph);
        }
    });

    body.on("change", function () {
        var bodyContent = body.val();
        asyncTimeStamp();
        asyncCharacterAmount(bodyContent);
    });
});

function getTime() {
    var d = new Date();

    return d.getFullYear() + "/" + (d.getMonth() + 1)
        + "/" + d.getDate() + " " + d.getHours() + ":" +
        d.getMinutes() + ":" + d.getSeconds();
}

function asyncTimeStamp() {
    var timeStamp = $("#time-stamp");
    timeStamp.text(getTime());
}

function asyncCharacterAmount(content){
    var characterAmount = $("#characterAmount");
    characterAmount.text("全文共" + content.length + "字");
}
