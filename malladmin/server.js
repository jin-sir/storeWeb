const express = require("express");
const url = require("url");
// dao中的链接数据库的方法
const shopDao = require("./dao/shopdao.js");
// 获取当前的时间戳（秒）
const timeUtil = require("./utils/TimeUtil.js");
// node-uuid 获取唯一标识
const uuid = require("node-uuid");
// 获取前端发来的cookie
const cookieParser = require("cookie-parser");
// 本地文件的增删改查
const fs = require("fs");
// 储存文件
const multer = require("multer");
const upload = multer({ dest: "./temp/" });
const saveUrl = "./page/images/shopsImgs/";
const bodyParser = require("body-parser");

const writeUtil = require("./utils/writeUtil.js");

const app = new express();
app.use(bodyParser.urlencoded({ extended: true }));
const getHeaders = {
  "content-type": "text/html; charset=utf-8",
  "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "content-type, x-requested-with",
  "Access-Control-Allow-Credentials": true
};
const postHeaders = {
  "content-type": "text/html; charset=utf-8",
  "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "content-type, x-requested-with",
  "Access-Control-Allow-Credentials": true
};
app.use(cookieParser());
app.use(express.static("./page"));

app.get("/login", function(request, response) {
  const params = url.parse(request.url, true).query;
  shopDao.loginAdmin(params, function(result) {
    if (!result.length) {
      const data = {
        state: 400,
        success: 0,
        error: "用户名或密码错误"
      };
      writeUtil.writeRes(response, getHeaders, data);
    } else {
      const atoken = uuid.v4();
      const setCookie = {
        "Set-Cookie": "atoken=" + atoken
      };
      const data = {
        state: 200,
        success: "登录成功",
        error: 0
      };
      const headers = { ...getHeaders, ...setCookie };
      writeUtil.writeRes(response, headers, data);
      shopDao.addAdminCookie({ ...params, atoken }, function(result) {
        // console.log(result);
      });
    }
  });
});
app.get("/admin", function(request, response) {
  const atoken = request.cookies.atoken;
  shopDao.queryAtokenLogin(atoken, function(result) {
    let data = null;
    if (!result.length) {
      data = {
        state: 400,
        username: ""
      };
    } else {
      data = {
        state: 200,
        username: result[0].username
      };
    }
    writeUtil.writeRes(response, getHeaders, data);
  });
});
app.get("/getProduceList", function(request, response) {
  const params = url.parse(request.url, true).query;
  const atoken = request.cookies.atoken;
  const origin = request.headers.origin || request.headers.host;
  // console.log(origin, origin != "http://127.0.0.1:5500");
  // console.log(origin);
  if (origin == "127.0.0.1:12315") {
    shopDao.queryAtokenLogin(atoken, function(result) {
      if (!result.length) {
        const data = {
          state: 400,
          error: "您还没有登录"
        };
        writeUtil.writeRes(response, getHeaders, data);
      } else {
        shopDao.queryProduceByPage(
          parseInt(params.offset),
          parseInt(params.limit),
          function(result) {
            shopDao.queryProduceCount(function(count) {
              result.forEach(function(item, index) {
                item.produceId = item.id;
                item.id = index + 1;
                item.cover = item.cover.split(",")[0];
              });
              const data = {
                rows: result,
                total: count[0].val
              };
              writeUtil.writeRes(response, getHeaders, data);
            });
          }
        );
      }
    });
  } else {
    shopDao.queryProduce(
      parseInt(params.offset),
      parseInt(params.limit),
      function(result) {
        // console.log(result);
        result.forEach(function(item, index) {
          item.produceId = item.id;
          item.id = index + 1;
          item.cover = "http://127.0.0.1:12315/" + item.cover.split(",")[0];
        });
        const data = {
          state: 200,
          rows: result,
          success: "ok"
        };
        // console.log(data);
        writeUtil.writeRes(response, getHeaders, data);
      }
    );
  }
});
app.post("/saveProduce", upload.array("cover"), function(request, response) {
  const files = request.files;
  let cover = "";
  const result = new Promise(function(res, rej) {
    files.map(function(item, index) {
      fs.readFile(item.path, function(err, result) {
        if (err) {
          return;
        }
        const fileName = item.filename + "." + item.originalname.split(".")[1];
        cover += "images/shopsImgs/" + fileName + ",";
        fs.writeFile(saveUrl + fileName, result, function(err) {
          if (err) rej(err);
          fs.unlink(item.path, function(error) {
            if (error) {
              // console.log(error);
              return false;
            }
            // console.log("删除目录成功");
          });
          res("success");
        });
      });
    });
  });
  result
    .then(res => {
      const produce = {
        id: uuid.v4(),
        ...request.body,
        cover,
        state: 0,
        ctime: timeUtil.getNow()
      };
      shopDao.insertGoods(produce, function(result) {
        // console.log(result);
        const data = {
          state: 200,
          success: "操作成功"
        };
        writeUtil.writeRes(response, postHeaders, data);
      });
    })
    .catch(err => {
      // console.log(err);
    });
});
app.get("/putaway", function(request, response) {
  const params = url.parse(request.url, true).query;
  shopDao.putaway(params.produceId, parseInt(params.state), function(res) {
    // console.log(res);
    const data = {
      state: 200,
      success: "操作成功"
    };
    writeUtil.writeRes(response, getHeaders, data);
  });
});
app.get("/getProduceTid", function(request, response) {
  const atoken = request.cookies.atoken;
  // console.log(params);
  shopDao.queryAtokenLogin(atoken, function(result) {
    // console.log(result);
    if (!result.length) {
      var data = {
        state: 400,
        error: "您还没有登录"
      };
      writeUtil.writeRes(response, getHeaders, data);
    } else {
      shopDao.queryProduceTid(function(result) {
        // console.log(result);
        const data = {
          state: 200,
          data: result
        };
        writeUtil.writeRes(response, getHeaders, data);
      });
    }
  });
});
app.post("/api/register", function(request, response) {
  const params = request.body;
  const userData = {
    ...params,
    id: uuid.v4(),
    ctime: timeUtil.getNow()
  };
  // console.log(params, userData);
  shopDao.excludeSameUser(params.tel, function(res) {
    if (res.length) {
      const data = {
        state: 400,
        success: "该用户已存在"
      };
      // console.log(data);
      writeUtil.writeRes(response, postHeaders, data);
    } else {
      shopDao.addUser(userData, function(res) {
        // console.log(res);
        const data = {
          state: 200,
          success: "操作成功"
        };
        // console.log(data);
        writeUtil.writeRes(response, postHeaders, data);
      });
    }
  });
});
app.get("/getUserCount", function(request, response) {
  const atoken = request.cookies.atoken;
  shopDao.queryAtokenLogin(atoken, function(result) {
    // console.log(result);
    if (!result.length) {
      const data = {
        state: 400,
        error: "您还没有登录"
      };
      writeUtil.writeRes(response, getHeaders, data);
    } else {
      shopDao.queryUserInfoCount(function(count) {
        const data = {
          state: 200,
          data: {
            count: count[0].val
          }
        };
        writeUtil.writeRes(response, getHeaders, data);
      });
    }
  });
});
app.get("/getProduceCount", function(request, response) {
  const atoken = request.cookies.atoken;
  shopDao.queryAtokenLogin(atoken, function(result) {
    // console.log(result);
    if (!result.length) {
      const data = {
        state: 400,
        error: "您还没有登录"
      };
      writeUtil.writeRes(response, getHeaders, data);
    } else {
      shopDao.queryProduceCount(function(count) {
        const data = {
          state: 200,
          data: {
            count: count[0].val
          }
        };
        writeUtil.writeRes(response, getHeaders, data);
      });
    }
  });
});
app.get("/getOrderList", function(request, response) {
  const params = url.parse(request.url, true).query;
  const atoken = request.cookies.atoken;
  const at_user = request.cookies.at_user;
  const origin = request.headers.origin || request.headers.host;
  // console.log(!at_user, origin != "http://127.0.0.1:5500");
  // console.log(at_user, origin);
  if (!at_user || origin != "http://127.0.0.1:5500") {
    // console.log(1111);
    shopDao.queryAtokenLogin(atoken, function(result) {
      // console.log(result);
      if (!result.length) {
        const data = {
          state: 400,
          error: "您还没有登录"
        };
        writeUtil.writeRes(response, getHeaders, data);
      } else {
        shopDao.queryOrderByPage(
          parseInt(params.offset),
          parseInt(params.limit),
          function(result) {
            shopDao.queryOrderCount(function(count) {
              // console.log(res)
              result.forEach(function(item, index) {
                // console.log(item);
                item.id = index + 1;
                item.cover = item.cover.split(",")[0];
              });
              const data = {
                rows: result,
                total: count[0].val
              };
              writeUtil.writeRes(response, getHeaders, data);
            });
          }
        );
      }
    });
  } else {
    shopDao.queryAtokenUserInfo({ atoken: at_user }, result => {
      if (!result.length) {
        const data = {
          state: 400,
          error: "您还没有登录"
        };
        writeUtil.writeRes(response, getHeaders, data);
      } else {
        shopDao.queryOrder(
          at_user,
          parseInt(params.offset),
          parseInt(params.limit),
          function(result) {
            result.forEach(function(item, index) {
              // console.log(index);
              item.id = index + 1;
              item.cover = item.cover.split(",")[0];
              item.cover = "http://127.0.0.1:12315/" + item.cover;
            });
            const data = {
              state: 200,
              success: "OK",
              rows: result
            };
            writeUtil.writeRes(response, getHeaders, data);
          }
        );
      }
    });
  }
});
app.get("/getAllOrderPrice", function(request, response) {
  const atoken = request.cookies.atoken;
  shopDao.queryAtokenLogin(atoken, function(result) {
    // console.log(result);
    if (!result.length) {
      const data = {
        state: 400,
        error: "您还没有登录"
      };
      writeUtil.writeRes(response, getHeaders, data);
    } else {
      const orderList = [];
      shopDao.queryAllOrderPrice(function(res) {
        const oneDayTime = 60 * 60 * 24;
        res.forEach(function(item) {
          // console.log(orderList.length);
          if (orderList.length > 6) {
            return;
          }
          const date = new Date(item.ctime*1000);
          const time = date.getFullYear() + '' + (date.getMonth()+1) + '' + date.getDate();
          const isSameTime = orderList.some(function(ele) {
            if (ele.day == time) {
              ele.price += item.price;
              return true;
            }
            return false;
          });
          if (isSameTime) {
            return;
          }
          orderList.push({
            price: item.price,
            ctime: item.ctime,
            day: time
          });
        });
        const data = {
          state: 200,
          data: orderList.reverse()
        };
        writeUtil.writeRes(response, getHeaders, data);
      });
    }
  });
});
app.post("/api/login", function(request, response) {
  const params = request.body;
  const atoken = request.cookies.at_user;
  const userData = {
    tel: params.username,
    password: params.password
  };
  if (!atoken) {
    shopDao.queryUserInfo(userData, result => {
      // console.log(result);
      if (!result.length) {
        const data = {
          state: 400,
          success: "你输入的密码和账户名不匹配，是否忘记密码"
        };
        writeUtil.writeRes(response, postHeaders, data);
      } else {
        const userinfo = result[0];
        const data = {
          state: 200,
          success: "登录成功",
          data: {
            username: userinfo.username,
            atoken: userinfo.id
          }
        };
        writeUtil.writeRes(response, postHeaders, data);
      }
    });
  } else {
    shopDao.queryAtokenUserInfo({ atoken }, result => {
      // console.log(result);
      if (!result.length) {
        const data = {
          state: 400,
          success: "error"
        };
        writeUtil.writeRes(response, postHeaders, data);
      } else {
        const userinfo = result[0];
        const data = {
          state: 200,
          success: "登录成功",
          data: {
            username: userinfo.username
          }
        };
        writeUtil.writeRes(response, postHeaders, data);
      }
    });
  }
});
app.get("/getProduce", function(request, response) {
  const origin = request.headers.origin;
  const params = url.parse(request.url, true).query;
  if (origin != "http://127.0.0.1:5500") {
    response.writeHead(404);
    response.end();
    return;
  }
  shopDao.searchProduce(params.produceId, function(result) {
    result.forEach(function(item, index) {
      item.cover = item.cover.split(",");
      item.cover = item.cover.map(function(ele) {
        if (!ele) {
          return false;
        }
        return "http://127.0.0.1:12315/" + ele;
      });
      item.cover = item.cover.filter(function(ele) {
        if (!ele) {
          return false;
        }
        return true;
      });

      item.color = item.color.split(",");
      item.color = item.color.filter(function(ele) {
        if (!ele) {
          return false;
        }
        return true;
      });

      item.size = item.size.split(",");
      item.size = item.size.filter(function(ele) {
        if (!ele) {
          return false;
        }
        return true;
      });

      item.style = item.style.split(",");
      item.style = item.style.filter(function(ele) {
        if (!ele) {
          return false;
        }
        return true;
      });
    });
    const data = {
      state: 200,
      success: "OK",
      produce: result
    };
    writeUtil.writeRes(response, getHeaders, data);
  });
});
app.post("/api/addCart", function(request, response) {
  const params = request.body;
  const atoken = request.cookies.at_user;
  const origin = request.headers.origin;
  // console.log(params, origin, atoken);
  if (origin != "http://127.0.0.1:5500") {
    response.writeHead(404);
    response.end();
    return;
  }
  if (!atoken) {
    const data = {
      state: 200,
      success: "请您先登录"
    };
    writeUtil.writeRes(response, postHeaders, data);
  } else {
    const data = {
      ...params,
      userId: atoken,
      ctime: timeUtil.getNow()
    };
    shopDao.addCart(data, function(result) {
      // console.log(result);
      if (result) {
        const data = {
          state: 200,
          success: "添加成功"
        };
        writeUtil.writeRes(response, postHeaders, data);
      }
    });
  }
});
app.get("/api/getCart", function(request, response) {
  const origin = request.headers.origin;
  const atoken = request.cookies.at_user;
  if (origin != "http://127.0.0.1:5500") {
    response.writeHead(404);
    response.end();
    return;
  }
  if (!atoken) {
    const data = {
      state: 200,
      success: "请您先登录"
    };
    writeUtil.writeRes(response, postHeaders, data);
  } else {
    shopDao.queryCart(atoken, function(result) {
      // console.log(result);
      if (result) {
        result.forEach(function(ele) {
          ele.cover = "http://127.0.0.1:12315/" + ele.cover.split(",")[0];
          ele.checked = false;
        });
        const data = {
          state: 200,
          success: "ok",
          data: result
        };
        writeUtil.writeRes(response, postHeaders, data);
      }
    });
  }
});
app.get("/api/getAddress", function(request, response) {
  const origin = request.headers.origin;
  const atoken = request.cookies.at_user;
  if (origin != "http://127.0.0.1:5500") {
    response.writeHead(404);
    response.end();
    return;
  }
  if (!atoken) {
    const data = {
      state: 200,
      success: "请您先登录"
    };
    writeUtil.writeRes(response, postHeaders, data);
  } else {
    shopDao.queryAddress(atoken, function(result) {
      // console.log(result);
      if (result) {
        const data = {
          state: 200,
          success: "ok",
          data: result
        };

        writeUtil.writeRes(response, postHeaders, data);
      }
    });
  }
});
app.post("/api/insertAddress", function(request, response) {
  const params = request.body;
  const atoken = request.cookies.at_user;
  const origin = request.headers.origin;
  // console.log(params);
  if (origin != "http://127.0.0.1:5500") {
    response.writeHead(404);
    response.end();
    return;
  }
  if (!atoken) {
    const data = {
      state: 200,
      success: "请您先登录"
    };
    writeUtil.writeRes(response, postHeaders, data);
  } else {
    const data = {
      ...params,
      userId: atoken,
      id: uuid.v4()
    };
    shopDao.insertReceiving(data, function(result) {
      // console.log(result);
      if (result) {
        shopDao.queryAddress(atoken, function (result) {
          const data = {
            state: 200,
            success: "添加成功",
            address: result
          };
          writeUtil.writeRes(response, postHeaders, data);
        });
      }
    });
  }
});
app.post("/api/updateAddress", function(request, response) {
  const params = request.body;
  const atoken = request.cookies.at_user;
  const origin = request.headers.origin;
  // console.log(params);
  if (origin != "http://127.0.0.1:5500") {
    response.writeHead(404);
    response.end();
    return;
  }
  if (!atoken) {
    const data = {
      state: 200,
      success: "请您先登录"
    };
    writeUtil.writeRes(response, postHeaders, data);
  } else {
    shopDao.updateAddress(params, function(result) {
      // console.log(result);
      if (result) {
        const data = {
          state: 200,
          success: "操作成功"
        };
        writeUtil.writeRes(response, postHeaders, data);
      }
    });
  }
});
app.post("/api/buyGoods", function(request, response) {
  const params = request.body;
  const atoken = request.cookies.at_user;
  const origin = request.headers.origin;
  // console.log(params);
  if (origin != "http://127.0.0.1:5500") {
    response.writeHead(404);
    response.end();
    return;
  }
  if (!atoken) {
    const data = {
      state: 200,
      success: "请您先登录"
    };
    writeUtil.writeRes(response, postHeaders, data);
  } else {
    const allInsert = [];
    for (let index in params) {
      const tempPromise = new Promise(function(res, rej) {
        const data = {
          userId: atoken,
          produceId: params[index].id,
          isdelivery: 0,
          auctionSku: params[index].auctionSku,
          receivingId: params[index].addressId,
          qty: params[index].count,
          ctime: timeUtil.getNow()
        };
        shopDao.insertOrder(data, function(result) {
          if (result) {
            shopDao.deleteCart(params[index].id, function(result) {
              res("ok");
            });
          }
        });
      });
      allInsert.push(tempPromise);
    }
    // console.log(allInsert);
    Promise.all(allInsert).then(res => {
      // console.log(res);
      const data = {
        state: 200,
        success: "操作成功"
      };
      writeUtil.writeRes(response, postHeaders, data);
    });
  }
});
app.listen(12315);
