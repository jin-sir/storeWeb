module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  devServer: {
    port: 12306
  }
};
