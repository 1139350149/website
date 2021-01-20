function editorFunction() {
    var functionButtons = $(".editor-controller-button");

    var uploadPicture = $("#uploadPicture");

    var fileContainer = $("#file-container");


    functionButtons.on("click", function () {
        var command = $(this).data('command');
        var editor = $("#editor-body");

        if (command === 'fontSize') {
            var size = $(this).text();
            document.execCommand(command, false, size);
            editor.trigger("input");
        } else if (command === 'picture') {
            uploadPicture.click();
            editor.trigger("input");
        } else {
            document.execCommand(command, false, null);
            editor.trigger("input");
        }
    });

    uploadPicture.on("change", function () {
        var file = $(this).prop("files");
        console.log(file);
        /* 构建上传文件的缩略图板块
         *
         */
        var imgContainer = $('<div class="img-container text-center"></div>');
        var formData = new FormData();
        formData.append("uploadPicture", file[0]);
        var img = $('<img class="img" title="' + file[0].name + '" src="../resource/loading.gif">');
        imgContainer.append(img);

        var progress = $('<div class="progress"></div>');
        var progressBar = $('<div class="progress-bar progress-bar-striped bg-success"></div>');

        progress.append(progressBar);
        imgContainer.append(progress);

        var progressValue = $('<p class="progress-value"></p>');
        imgContainer.append(progressValue);

        $.ajax({
            type: "post",
            url: "uploadPicture",
            async: true,
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', function (e) {
                        var percentage = parseInt(e.loaded / e.total * 100);
                        progressValue.text(percentage + '%');
                        progressBar.css("width", percentage + '%');
                    });
                }
                return xhr;
            },
            success: function (data) {
                img.attr('src', '/getPicture?fileName=' + data);
                img.attr('fileName', data);

                img.on("click", function () {
                    var editor = $("#editor-body");
                    var img = $('<img src="' + $(this).attr('src') + '" width="300" height="auto" alt="" />');
                    editor.append(img);
                    editor.trigger("input");
                });
            },
            error: function (data) {
                console.log(data);
            }
        });

        var fileList = $(
            '<a class="delete-file" href="javascript:void(0);">'
            + file[0].name +
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

        fileContainer.append(imgContainer);
    })
}

function deleteImgTag(content, name) {
    var regex = new RegExp("<img[^>]*" + name + "[^>]*>", "ig");
    return content.replace(regex, "");
}