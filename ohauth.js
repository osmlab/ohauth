var ohauth = {};

function qsString(obj) {
    return Object.keys(obj).sort().map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
}

function stringQs(str) {
    return str.split('&').reduce(function(obj, pair){
        var parts = pair.split('=');
        obj[parts[0]] = (null === parts[1]) ? '' : decodeURIComponent(parts[1]);
        return obj;
    }, {});
}

ohauth.nonce = function() {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',
        result = '';
    for (var i = 0; i < 6; ++i) {
        var rnum = Math.floor(Math.random() * 61);
        result += chars.substring(rnum, rnum + 1);
    }
    return result;
};

ohauth.timestamp = function() { return ~~((+new Date()) / 1000); };

ohauth.percentEncode = function(s) {
    return encodeURIComponent(s)
        .replace(/\!/g, '%21')
        .replace(/\*/g, '%2A')
        .replace(/\'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29');
};

ohauth.baseString = function(method, url, params) {
    return [
        method,
        ohauth.percentEncode(url),
        ohauth.percentEncode(qsString(params))].join('&');
};
