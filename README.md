[![build](https://github.com/osmlab/ohauth/workflows/build/badge.svg)](https://github.com/osmlab/ohauth/actions?query=workflow%3A%22build%22)
[![npm version](https://badge.fury.io/js/ohauth.svg)](https://badge.fury.io/js/ohauth)


## ohauth

A most-of-the-way OAuth 1.0 client implementation in Javascript. Meant to be
an improvement over the [default linked one](http://oauth.googlecode.com/svn/code/javascript/)
because this uses idiomatic Javascript.

If you use this on a server [different from the one authenticated against](http://en.wikipedia.org/wiki/Same_origin_policy),
you'll need to [enable](http://enable-cors.org/) and use [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
for cross-origin resources. CORS is not available in IE before version IE10.


### Demo

Try it out at:  http://osmlab.github.io/ohauth/


### Usage

As a file

    wget https://raw.github.com/osmlab/ohauth/gh-pages/ohauth.js

With browserify

    npm install ohauth
    var ohauth = require('ohauth');


### Compatibility

* [OpenStreetMap](http://www.openstreetmap.org/) full & tested with iD
* GitHub - partial, full flow is not possible because `access_token` API is not CORS-enabled


### API

```js
// make an oauth request.
ohauth.xhr(method, url, access_token, data, options, callback);

// options can be a header like
{ header: { 'Content-Type': 'text/xml' } }

ohauth.xhr('POST', url, o, null, {}, function(xhr) {
    // xmlhttprequest object
});

// generate a querystring from an object
ohauth.qsString({ foo: 'bar' });
// foo=bar

// generate an object from a querystring
ohauth.stringQs('foo=bar');
// { foo: 'bar' }
```
