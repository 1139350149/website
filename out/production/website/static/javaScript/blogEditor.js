function editorFunction() {
    var functionButtons = $(".editor-controller-button");
    var uploadPicture = $("#uploadPicture");
    var fileContainer = $("#file-container");

    var emojiButtons = $(".emoji-button");

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

    emojiButtons.on("click", function () {
        var command = $(this).data('command');
        var editor = $("#editor-body");
        var img = $('<img src="../resource/emoji/' + command + '.png" width="40" height="auto" alt="" />');
        editor.append(img);
        editor.trigger("input");
    });

    uploadPicture.on("change", function () {
        var file = $(this).prop("files");
        if(file === undefined){
            return false;
        }

        if (file[0].size> 10 * 1024 * 1024){
            toast("图片过大", "图片过大，禁止上传", "info");
            return false;
        }

        generateImgContainer(file, fileContainer);
    })
}

function generateImgContainer(file, fileContainer){
    /* 构建上传文件的缩略图板块
         *
         */
    var imgContainer = $('<div class="img-container text-center"></div>');
    var formData = new FormData();
    formData.append("uploadPicture", file[0]);
    var img = $('<img class="img" title="' + file[0].name + '" src="../resource/loading.gif" />');
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
}

function deleteImgTag(content, name) {
    var regex = new RegExp("<img[^>]*" + name + "[^>]*>", "ig");
    return content.replace(regex, "");
}


function editorCheck() {
    var title = $("#title");
    var body = $("#body");
    if(title.val().length === 0 || title.val().length > 30){
        toast("标题长度", "请输入或缩短标题！", "notice");
        return false;
    }
    if (body.val().length === 0 || body.val().length > 12000){
        toast("正文长度", "请输入或缩短正文！", "notice");
        return false;
    }
    return true;
}

function asyncTitle(title, titlePreview) {
    title.on("input", function () {
        titlePreview.text(title.val());
    });

    title.on("change", asyncTimeStamp);
}

function asyncPreviewBody(body, content, area) {
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

function getTime() {
    var d = new Date();

    return d.getFullYear() + "/" + (d.getMonth() + 1)
        + "/" + d.getDate() + " " + d.getHours() + ":" +
        d.getMinutes() + ":" + d.getSeconds();
}

function remarkCheck(){
    var remark = $("#remark");
    if(remark.val().length === 0 || remark.val().length > 12000){
        toast("评论长度", "请输入或缩短评论！", "notice");
        return false;
    }
    return true;
}

function asyncRemarkBody(body, area){
    body.on("input", function () {
        var bodyContent = body.html();
        asyncTimeStamp();
        area.html(bodyContent);
    });
}