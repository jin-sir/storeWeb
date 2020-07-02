function getNow() {
    var data = new Date().getTime();
    return Math.ceil(data / 1000);
}

module.exports.getNow = getNow;