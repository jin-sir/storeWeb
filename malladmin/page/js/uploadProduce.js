!(function($) {
  var $fileInput = $(".fileInput");
  var filePicArray = [];
  $(".filePicker").click(function() {
    $fileInput.click();
    console.log($fileInput.files);
  });
  $fileInput.on("change", function(e) {
    if (!this.files.length) {
      alert("请选择图片");
      return;
    }
    if (filePicArray.length >= 7) {
      return;
    }
    this.files.forEach(function(item) {
      filePicArray.push(item);
      if (window.FileReader) {
        var fr = new FileReader();
        fr.readAsDataURL(item);
        fr.onloadend = function(e) {
          $(".pic-show")[0].innerHTML +=
            "<li><img src='" + e.target.result + "' /></li>";
        };
      }
    });
  });
  $(".submit-btn").click(function() {
    var formData = new FormData($(".upload-form")[0])
    formData.delete('cover')
      filePicArray.forEach(function (item, index) {
          formData.append('cover', item);
      })
      $.ajax({
        url: '/saveProduce',
        type: 'post',
        data:formData,
        cache: false, 
        processData: false, 
        contentType: false, 
        success: function(res) {
          res = JSON.parse(res);
          if (res.state !== 200) {
            alert('上传失败');
          }
          alert('上传成功');
          $('.menu-produce').click();
            console.log(res);
        }
      });
  });
})(window.jQuery);
