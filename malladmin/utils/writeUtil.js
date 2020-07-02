function writeRes (response, headers, data) {
    response.writeHead(200, headers);
    response.write(JSON.stringify(data));
    response.end();
}

module.exports.writeRes = writeRes;