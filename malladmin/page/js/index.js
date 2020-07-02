!(function($) {
  window.onload= function () {
    var isLogin = operationCookie.getCookie('atoken');
    console.log(isLogin)
    if (!isLogin.length) {
      window.location.href = '/login.html';
      return;
    }
    $.ajax({
      url: '/admin',
      methods: 'get',
      beforeSend: function (xhr) {
        xhr.withCredentials = true
      },
      success: function (res) {
        res = JSON.parse(res);
        if (res.state === 400) {
          window.location.href = '/login.html';
          return;
        }
        $('.user-name').text(res.username)
        console.log(res);
      }
    });
  };
  // 菜单栏切换
  var menuList = {
    init: function(dom) {
      this.bindTap(dom);
    },
    bindTap: function(dom) {
      this.addEvent(dom, "click", function(e) {
        var target = null;
        if (
          !("dd" === e.target.tagName.toLowerCase()) &&
          !("dd" === e.target.parentNode.tagName.toLowerCase())
        ) {
          return false;
        } else if ("dd" === e.target.parentNode.tagName.toLowerCase()) {
          target = e.target.parentNode;
        } else {
          target = e.target;
        }
        var contentHome = document.getElementsByClassName("content-home")[0];
        contentHome && (contentHome.classList.add('content'), contentHome.classList.remove('content-home'));

        var menuTab = document.getElementsByClassName("menu-tab")[0];
        menuTab && menuTab.classList.remove("menu-tab");
        target.classList.add("menu-tab");

        var contentClass = target.getAttribute("data-class");
        var contentActive = document.getElementsByClassName(
          "content-active"
        )[0];
        contentActive && contentActive.classList.remove("content-active");
        var content = document.getElementsByClassName(contentClass)[0];
        content.classList.add("content-active");
      });
    },
    addEvent: function(elem, type, handle) {
      if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
      } else if (elem.attachEvent) {
        elem.attachEvent("on" + type, handle);
      } else {
        elem["on" + type] = handle;
      }
    }
  };
  menuList.init(document.getElementsByClassName("tap")[0]);

  // 退出登录
  $('.to-btn').click(function () {
    operationCookie.removeCookie('atoken');
    window.location.href = '/login.html';
  })
  var operationCookie = {
    setCookie: function (name, value, time) {
        document.cookie = name + '=' + value + ';max-age=' + time;
        return this;
    },
    removeCookie: function (name) {
        return this.setCookie(name, '', '-1');
    },
    getCookie: function (name) {
        var cookie = document.cookie.split('; ');
        return cookie.filter(function (ele, index) {
            var itemCookie = ele.split('=');
            console.log(itemCookie,name)
            return itemCookie[0] == name;
            // if (itemCookie[0] == name) {
            //     console.log(itemCookie[1])
            //     callback(itemCookie[1]);
            //     return this;
            // }
        });
    }
};
})(window.jQuery);
