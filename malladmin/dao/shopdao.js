var dbutil = require("./DButil.js");
// var timeUtil = require("../utils/TimeUtil.js");

// 插入商品
function insertGoods(
  {
    id,
    produceName,
    storeName,
    price,
    stock,
    state,
    cover,
    style,
    category,
    size,
    color,
    ctime
  },
  callback
) {
  var sql =
    "insert into produceList (`id`, `produceName`, `storeName`, `price`, `stock`, `state`, `cover`, `style`, `category`, `size`, `color`,`cumulativeEvaluation`, `ctime`) values (?,?,?,?,?,?,?,?,?,?,?,0,?);";
  var insertParams = [
    id,
    produceName,
    storeName,
    price,
    stock,
    state,
    cover,
    style,
    category,
    size,
    color,
    ctime
  ];
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, insertParams, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    callback(result);
  });
  connection.end();
}
// 插入订单
function insertOrder(
  { userId, produceId, isdelivery, auctionSku, receivingId, qty, ctime },
  success
) {
  var sql =
    "insert into orderlist (`userId`, `produceId`, `isdelivery`, `auctionSku`, `receivingId`, `qty`,`ctime`) values (?, ?, ?, ?, ?, ?, ?);";
  var insertParams = [
    userId,
    produceId,
    isdelivery,
    auctionSku,
    receivingId,
    qty,
    ctime
  ];
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, insertParams, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 删除购物车
function deleteCart(goodsId, success) {
  var sql = "delete from shoppingcart where goodsId=?;";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, [goodsId], function(result) {
    success(result);
  });
  connection.end();
}
// 获取商品数据，第几条到第几条
function queryProduceByPage(offset, limit, callback) {
  var sql = "select * from produceList order by ctime desc limit ?, ?;";
  var params = [offset, limit];
  var connection = dbutil.getConnection();
  // console.log(sql,params)
  connection.query(sql, params, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    callback(result);
  });
  connection.end();
}
// 获取商品数据，第几条到第几条
function queryProduce(offset, limit, callback) {
  var sql = "select * from produceList where state=1 limit ?, ?;";
  var params = [offset, limit];
  var connection = dbutil.getConnection();
  // console.log(sql,params)
  connection.query(sql, params, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    callback(result);
  });
  connection.end();
}
// 查找商品
function searchProduce(produceId, success) {
  var sql =
    "select id,produceName, storeName, price,stock,cover,style,category,size,color,cumulativeEvaluation from produceList where `id`=?";
  var params = [produceId];
  var connection = dbutil.getConnection();
  // console.log(sql,params)
  connection.query(sql, params, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 获取订单数据，第几条到第几条
function queryOrderByPage(offset, limit, callback) {
  var sql =
    "select a.username, d.tel, b.produceName, b.price, b.cover, c.ctime, concat(d.province,d.city,d.originPlace,d.detailAddress) as address from userinfo a, producelist b, orderlist c, receiving d where a.id = c.userId and b.id = c.produceId and c.receivingId = d.id order by c.ctime desc limit ?, ?;";
  var params = [offset, limit];
  var connection = dbutil.getConnection();
  // console.log(sql,params)
  connection.query(sql, params, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    callback(result);
  });
  connection.end();
}
// 前端获取订单数据
function queryOrder(userId, offset, limit, callback) {
  var sql =
    "select a.consignee, a.tel,a.province,a.city,a.originPlace,a.detailAddress,b.produceName,b.cover,b.storeName,b.price, c.qty,c.isdelivery,c.auctionSku,c.ctime from receiving a, producelist b, orderlist c where a.id = c.receivingId and b.id = c.produceId and c.userId=? order by c.ctime desc limit ?, ?;";
  var params = [userId, offset, limit];
  var connection = dbutil.getConnection();
  // console.log(sql,params)
  connection.query(sql, params, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    callback(result);
  });
  connection.end();
}
// 获取商品的总数据条数
function queryProduceCount(success) {
  var sql = "select count(*) as val from produceList";
  var connection = dbutil.getConnection();
  connection.query(sql, [], function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    success(result);
  });
  connection.end();
}
// 获取商品的总数据条数
function queryOrderCount(success) {
  var sql = "select count(*) as val from orderlist";
  var connection = dbutil.getConnection();
  connection.query(sql, [], function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    success(result);
  });
  connection.end();
}
// 获取用户的总数据条数
function queryUserInfoCount(success) {
  var sql = "select count(*) as val from userinfo";
  var connection = dbutil.getConnection();
  connection.query(sql, [], function(err, result) {
    if (err) {
      console.log(err);
      return;
    }
    success(result);
  });
  connection.end();
}
// 查找管理员
function loginAdmin({ username, password }, success) {
  var sql = "select * from admin where username=? and password=?;";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, [username, password], function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 每次管理员登录更新cookie
function addAdminCookie({ username, password, atoken }, success) {
  var sql = "update admin set atoken=? where username=? and password=?;";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, [atoken, username, password], function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 判断发过来的cookie是否是管理员自动登录
function queryAtokenLogin(atoken, success) {
  var sql = "select * from admin where atoken=?";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, [atoken], function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 商品上架
function putaway(id, state, success) {
  state = state ? 0 : 1;
  var sql = "update produceList set state=? where id=?";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, [state, id], function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 添加用户
function addUser({ id, username, password, tel, ctime }, success) {
  var sql =
    "insert into userinfo (`id`, `username`, `password`, `tel`, `ctime`) values (?,?,?,?,?);";
  var insertParams = [id, username, password, tel, ctime];
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, insertParams, function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 判断用户是否注册多了
function excludeSameUser(tel, success) {
  var sql = "select * from userinfo where tel=?";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, [tel], function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 获取所有商品类别
function queryProduceTid(success) {
  var sql = "select category from producelist;";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, "", function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// queryProduceTid(function (res) {
//     console.log(res)
// })
// 获取所有订单的交易价格和时间
function queryAllOrderPrice(success) {
  var sql =
    "select a.price, b.ctime from producelist a, orderlist b where a.id = b.produceId order by b.ctime desc;";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, [], function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 用户登录判断
function queryUserInfo({ tel, password }, success) {
  var sql = "select * from userinfo where `tel`=? and `password`=?;";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, [tel, password], function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 用户atoken登录判断
function queryAtokenUserInfo({ atoken }, success) {
  var sql = "select * from userinfo where `id`=?;";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, [atoken], function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 添加购物车
function addCart({ produceId, userId, qty, style, ctime }, success) {
  var sql =
    "insert into shoppingcart (`goodsId`, `userId`, `qty`, `style`, `ctime`) values (?, ?, ?, ?, ?);";
  var connection = dbutil.getConnection();
  connection.connect();
  console.log(sql)
  isSameCart({ produceId, userId }, function(result) {
      console.log(result)
    if (result.length) {
      sql = "update shoppingcart set qty=? where goodsId=?;";
      console.log(sql,result);
      connection.query(sql, [parseInt(qty) + parseInt(result[0].qty), produceId], function(
        error,
        result
      ) {
        if (error) {
          console.log(error);
          return;
        }
        success(result);
      });
      connection.end();
    } else {
        console.log(123)
      connection.query(sql, [produceId, userId, qty, style, ctime], function(
        error,
        result
      ) {
        if (error) {
          console.log(error);
          return;
        }
        success(result);
      });
      connection.end();
    }
  });
}
// 去除购物车重复
function isSameCart({ produceId, userId }, success) {
  var sql = "select * from shoppingcart where `goodsId`=? and `userId`=?;";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, [produceId, userId], function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 获取购物车
function queryCart(userId, success) {
  var sql =
    "select a.qty,a.style,b.produceName,a.goodsId,b.storeName,b.price,b.cover from shoppingcart a, producelist b where a.goodsId=b.id and a.userId=?;";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, [userId], function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 获取用户设定的地址
function queryAddress(userId, success) {
  var sql =
    "select id, consignee, tel, province, city, originPlace, detailAddress from receiving where userId=?;";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(sql, [userId], function(error, result) {
    if (error) {
      console.log(error);
      return;
    }
    success(result);
  });
  connection.end();
}
// 添加地址
function insertReceiving(
  { id, userId, consignee, tel, province, city, originPlace, detailAddress },
  success
) {
  var sql =
    "insert into receiving (`id`, `userId`, `consignee`, `tel`, `province`, `city`, `originPlace`, `detailAddress`) value (?,?,?,?,?,?,?,?);";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(
    sql,
    [id, userId, consignee, tel, province, city, originPlace, detailAddress],
    function(error, result) {
      if (error) {
        console.log(error);
        return;
      }
      success(result);
    }
  );
  connection.end();
}
// 更新地址
function updateAddress(
  { id, consignee, tel, province, city, originPlace, detailAddress },
  success
) {
  var sql =
    "update receiving set `consignee`=?, `tel`=?, `province`=?, `city`=?, `originPlace`=?, `detailAddress`=? where id=?;";
  var connection = dbutil.getConnection();
  connection.connect();
  connection.query(
    sql,
    [consignee, tel, province, city, originPlace, detailAddress, id],
    function(error, result) {
      if (error) {
        console.log(error);
        return;
      }
      success(result);
    }
  );
  connection.end();
}

module.exports = {
  insertGoods,
  queryProduceByPage,
  queryOrderByPage,
  queryProduceCount,
  queryOrderCount,
  queryUserInfoCount,
  loginAdmin,
  addAdminCookie,
  queryAtokenLogin,
  putaway,
  addUser,
  excludeSameUser,
  insertOrder,
  queryProduceTid,
  queryAllOrderPrice,
  queryUserInfo,
  queryAtokenUserInfo,
  queryOrder,
  searchProduce,
  addCart,
  queryCart,
  queryProduce,
  queryAddress,
  insertReceiving,
  updateAddress,
  deleteCart
};

// insertOrder({
//     userId: '2d53f147-ef62-4137-852d-c794c7c7a67d',
//     produceId: '64d01827-8ea9-4187-ba85-a3f0ca7432d7',
//     address: '浙江省富阳区高科路198号',
//     ctime: 1576944804
// }, function(res) {
//     console.log(res);
// })
// insertOrder({
//     userId: '2d53f147-ef62-4137-852d-c794c7c7a67d',
//     produceId: 'd65acba3-b557-4536-b3e2-280db1923efb',
//     address: '浙江省富阳区高科路198号',
//     ctime: 1576944804
// }, function(res) {
//     console.log(res);
// })
// var data = {produceName: '抗冻神器棉外套', storeName: '波斯等', price: 594, stock: 654, state: 1, cover: 'images/coat_1.jpg', style: "颜色:黑色,白色", category: '外套', ctime: timeUtil.getNow()}
// insertGoods(data, function (result) {
//     console.log(result)
// })
