$(document).ready(function () {
    var title = $("#title");
    var editorBody = $("#editor-body");
    var titlePreview = $("#title-preview");
    var content = $("#content");
    var area = $("#body");
    var fileContainer = $("#file-container");

    editorFunction();
    asyncTitle(title, titlePreview);
    asyncBody(editorBody, content, area);
    recoverPictureData(editorBody, fileContainer);

    title.trigger("input");
    editorBody.trigger("input");
});

function recoverPictureData(editorBody, fileContainer) {
    var imgReg = /<img[^>]*>/gi;
    var fileNameReg = /getPicture\?[^"]*"/g;
    var arr = editorBody.html().match(imgReg);

    var fileRealNameSet = [];
    var fileOriginalNameSet = [];

    for (var i = 0; i < arr.length; i++) {
        var fileName = arr[i].match(fileNameReg);
        //获取图片经过后台防重复编码后的名称
        if (fileName[0]) {
            var fileRealName = fileName[0].substring(fileName[0].indexOf("=") + 1, fileName[0].length - 1);
            if (fileRealNameSet.indexOf(fileRealName) === -1) {
                fileRealNameSet.push(fileRealName);
                var fileDot = fileRealName.lastIndexOf('.');
                var fileOriginalName = fileRealName.substring(0, fileDot - 20);
                var fileType = fileRealName.substring(fileDot + 1);

                fileOriginalNameSet.push(fileOriginalName + "." + fileType);
            }
        }
    }

    console.log(fileRealNameSet);
    console.log(fileOriginalNameSet);

    for (i = 0; i < fileRealNameSet.length; i++) {
        var imgContainer = $('<div class="img-container text-center"></div>');
        var img = $('<img class="img" title="' + fileOriginalNameSet[i] + '" src="/getPicture?fileName=' + fileRealNameSet[i] + '" />');
        img.attr('fileName', fileRealNameSet[i]);
        img.on("click", function () {
            var editor = $("#editor-body");
            var img = $('<img src="' + $(this).attr('src') + '" width="300" height="auto" alt="" />');
            editor.append(img);
            editor.trigger("input");
        });
        imgContainer.append(img);
        var fileList = $(
            '<a class="delete-file" href="javascript:void(0);">'
            + fileOriginalNameSet[i] +
            '</a>');
        imgContainer.append(fileList);
        fileList.on("click", function () {
            imgContainer.remove();
            var data = new FormData();
            data.append("fileName", img.attr('fileName'));

            $.ajax({
                url: 'deletePicture',
                type: 'post',
                data: data,
                async: true,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data) {
                        toast('删除图片', '删除成功', 'success');
                        var editor = $("#editor-body");
                        console.log(editor.html());
                        editor.html(deleteImgTag(editor.html(), img.attr('fileName')));
                        editor.trigger("input");
                    } else {
                        toast('删除图片', '删除失败', 'error');
                    }
                },
                error: function (data) {
                    toast('删除图片', '网络错误！', 'error');
                }
            });
        });
        fileContainer.append(imgContainer)
    }
}
