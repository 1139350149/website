$(document).ready(function () {
    var title = $("#title");
    var editorBody = $("#editor-body");
    var titlePreview = $("#title-preview");
    var content = $("#content");
    var area = $("#body");

    editorFunction();

    asyncTitle(title, titlePreview);

    asyncPreviewBody(editorBody, content, area);
});
