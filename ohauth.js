(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ohauth = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var ohauth = {};

ohauth.qsString = function (obj) {
  return Object.keys(obj)
    .sort()
    .map(function (key) {
      return ohauth.percentEncode(key) + '=' + ohauth.percentEncode(obj[key]);
    })
    .join('&');
};

ohauth.stringQs = function (str) {
  return str
    .split('&')
    .filter(function (pair) {
      return pair !== '';
    })
    .reduce(function (obj, pair) {
      var parts = pair.split('=');
      obj[decodeURIComponent(parts[0])] =
        null === parts[1] ? '' : decodeURIComponent(parts[1]);
      return obj;
    }, {});
};

ohauth.rawxhr = function (method, url, data, headers, callback) {
  var xhr = new XMLHttpRequest(),
    twoHundred = /^20\d$/;
  xhr.onreadystatechange = function () {
    if (4 === xhr.readyState && 0 !== xhr.status) {
      if (twoHundred.test(xhr.status)) callback(null, xhr);
      else return callback(xhr, null);
    }
  };
  xhr.onerror = function (e) {
    return callback(e, null);
  };
  xhr.open(method, url, true);
  for (var h in headers) xhr.setRequestHeader(h, headers[h]);
  xhr.send(data);
  return xhr;
};

ohauth.xhr = function (method, url, access_token, data, options, callback) {
  var headers = (options && options.header) || {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  headers.Authorization = 'Bearer ' + access_token;
  return ohauth.rawxhr(method, url, data, headers, callback);
};

ohauth.percentEncode = function (s) {
  return encodeURIComponent(s)
    .replace(/\!/g, '%21')
    .replace(/\'/g, '%27')
    .replace(/\*/g, '%2A')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
};

module.exports = ohauth;

},{}]},{},[1])(1)
});
