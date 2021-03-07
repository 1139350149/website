$(document).ready(function () {
    var editorBody = $("#editor-body");
    var area = $("#remark");

    editorFunction();

    asyncRemarkBody(editorBody, area);
});