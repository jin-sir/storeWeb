!(function ($) {
    $('.submit-btn').click(function () {
        var data = $('.login-form').serializeArray();
        var params = {
            [data[0].name]: data[0].value,
            [data[1].name]: data[1].value
        };
        $.ajax({
            url: '/login',
            methods: 'get',
            data: params,
            success: function (res) {
                res = JSON.parse(res);
                if (res.state === 400) {
                    alert(res.error)
                    return;
                }
                
                window.location.href = '/index.html';
            }
        });
    });
})(window.jQuery);