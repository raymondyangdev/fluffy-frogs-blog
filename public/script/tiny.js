window.addEventListener('load', function () {
    tinymce.init({
        selector: '#content',
        plugins: ['image'],
        toolbar:
            'undo redo | formatselect' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent |' +
            'image',

        image_title: true,
        automatic_uploads: true,
        relative_urls: false,
        file_picker_types: 'image',

        file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = function () {
                var file = this.files[0];

                var reader = new FileReader();

                reader.onload = function () {
                    var id = 'blobid' + new Date().getTime();
                    var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                    var base64 = reader.result.split(',')[1];
                    var blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);
                    cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
            };

            input.click();
        },
        images_upload_url: '/uploadImg',
    });
});
