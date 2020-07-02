!(function($, echarts) {
  var chartForm = {
    init: function() {
      this.getData();
      this.optionTid = {
        title: {
          // text: "某站点用户访问来源",
          // subtext: "纯属虚构",
          // x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          top: 50
          // data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              // { value: 335, name: "直接访问" },
              // { value: 310, name: "邮件营销" },
              // { value: 234, name: "联盟广告" },
              // { value: 135, name: "视频广告" },
              // { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.optionTransaction = {
        title: {
          left: "center",
          text: "近7日每日交易总量"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [],
            type: "line",
            smooth: true
          }
        ]
      };
    },
    getData: function() {
      var self = this;
      // 获取类别
      $.ajax({
        url: "/getProduceTid",
        type: "get",
        beforeSend: function(xhr) {
          xhr.withCredentials = true;
        },
        success: function(res) {
          res = JSON.parse(res);
          if (res.state === 400) {
            window.location.href = "/login.html";
            return;
          }

          console.log(res);
          self.tidForm(res);
        }
      });
      // 获取用户数量
      $.ajax({
        url: "/getUserCount",
        type: "get",
        beforeSend: function(xhr) {
          xhr.withCredentials = true;
        },
        success: function(res) {
          res = JSON.parse(res);
          if (res.state === 400) {
            window.location.href = "/login.html";
            return;
          }

          console.log(res);
          self.getUserSum(res.data.count);
        }
      });
      // 获取商品数量
      $.ajax({
        url: "/getProduceCount",
        type: "get",
        beforeSend: function(xhr) {
          xhr.withCredentials = true;
        },
        success: function(res) {
          res = JSON.parse(res);
          if (res.state === 400) {
            window.location.href = "/login.html";
            return;
          }
          console.log(res);
          self.getProduceSum(res.data.count);
        }
      });
      // 获取近期每天的交易额
      $.ajax({
        url: "/getAllOrderPrice",
        type: "get",
        beforeSend: function(xhr) {
          xhr.withCredentials = true;
        },
        success: function(res) {
          res = JSON.parse(res);
          console.log(res);
          if (res.state === 400) {
            window.location.href = "/login.html";
            return;
          }
          self.transactionForm(res);
        }
      });
    },
    tidForm: function(res) {
      var myChart = echarts.init($(".tid-chart")[0]);
      var optionTid = this.optionTid;
      var seriesData = [];
      var legendData = [];
      optionTid.title = {
        text: "商品类别详情图",
        subtext: "信息属实",
        x: "center"
      };
      console.log(res);
      res.data.forEach(function(item) {
        console.log(item);
        var isSame = seriesData.some(function(ele, index) {
          console.log(ele, item);
          if (ele.name === item.category) {
            seriesData[index].value++;
            return true;
          }
          return false;
        });
        console.log(isSame);
        if (isSame) {
          return;
        }
        var tempData = {
          value: 1,
          name: item.category
        };
        seriesData.push(tempData);
      });
      seriesData.forEach(function(item) {
        legendData.push(item.name);
      });
      optionTid.legend.data = legendData;
      optionTid.series[0].data = seriesData;
      console.log(seriesData, legendData);
      console.log(this.optionTid);
      myChart.setOption(this.optionTid);
    },
    transactionForm: function(res) {
      var xAxisData = [],
        seriesData = [],
        optionTransaction = this.optionTransaction;
      myChart = echarts.init($(".transaction-amount")[0]);
      res.data.forEach(function(item) {
        var date = new Date(item.ctime * 1000);
        var ctime =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
        xAxisData.push(ctime);
        seriesData.push(item.price);
      });
      optionTransaction.xAxis.data = xAxisData;
      optionTransaction.series[0].data = seriesData;
      console.log(optionTransaction);
      myChart.setOption(this.optionTransaction);
    },
    getUserSum: function(count) {
      $(".userinfo-sum").text(count);
    },
    getProduceSum: function(count) {
      $(".produce-sum").text(count);
    }
  };
  $(".dataCenter").click(function() {
    chartForm.init();
  });
})(window.jQuery, window.echarts);
