!(function($) {
  $("#order-table").bootstrapTable({
    url: "/getOrderList", //请求后台的URL（*）
    method: "get", //请求方式（*）
    striped: true, //是否显示行间隔色
    pagination: true, //是否显示分页（*）
    sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
    pageNumber: 1, //初始化加载第一页，默认第一页
    pageSize: 5, //每页的记录行数（*）
    pageList: [5, 10, 20], //可供选择的每页的行数（*）
    ajaxOptions: {
      beforeSend: function(xhr) {
        console.log(xhr);
        xhr.withCredentials = true;
      }
    },
    columns: [
      {
        field: "id",
        title: "ID"
      },
      {
        field: "username",
        title: "用户"
      },
      {
        field: "cover",
        title: "图片",
        formatter: function(value, row, index) {
          return `<img width="50px" height="50px" src='${value}' class="img-rounded" >`;
        }
      },
      {
        field: "produceName",
        title: "商品名称"
      },

      {
        field: "price",
        title: "价格"
      },
      {
        field: "tel",
        title: "手机"
      },
      {
        field: "address",
        title: "地址"
      },
      {
        field: "ctime",
        title: "下单时间",
        formatter: function(value) {
          var unixTimestamp = new Date(value * 1000);
          return unixTimestamp.toLocaleString();
        }
      }
    ],
    onPostBody: function(data) {
      $(".operationBtn").click(function() {
        var produceId = this.getAttribute("data-produceId");
        var state = this.getAttribute("data-state");
        $.ajax({
          url: "/putaway",
          data: {
            produceId,
            state
          },
          success: function(res) {
            res = JSON.parse(res);
            if (res.state !== 200) return;
            $("#order-table").bootstrapTable("refresh");
          }
        });
      });
    }
  });
})($);
