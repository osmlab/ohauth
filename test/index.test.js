'use strict';

var test = require('tap').test;
var ohauth = require('../.');

test('ohauth', function(t) {
    t.test('#qsString', function(t) {
        t.test('turns an object into a querystring', function(t) {
            t.deepEqual(ohauth.qsString({ foo: 1 }), 'foo=1');
            t.end();
        });
        t.test('escapes special characters', function(t) {
            t.deepEqual(ohauth.qsString({ '!\'*()': '!\'*()' }), '%21%27%2A%28%29=%21%27%2A%28%29');
            t.end();
        });
        t.end();
    });

    t.test('#stringQs', function(t) {
        t.test('turns a querystring into an object', function(t) {
            t.deepEqual(ohauth.stringQs('foo=1'), { foo: 1 });
            t.end();
        });
        t.test('handles special characters', function(t) {
            t.deepEqual(ohauth.stringQs('%21%27%2A%28%29=%21%27%2A%28%29'), { '!\'*()': '!\'*()' });
            t.end();
        });
        t.test('handles querystrings with empty arguments', function(t) {
            t.deepEqual(ohauth.stringQs(''), {});
            t.deepEqual(ohauth.stringQs('foo=1&'), { foo: 1 });
            t.end();
        });
        t.end();
    });

    t.test('#nonce', function(t) {
        t.test('generates a 6-character nonce', function(t) {
            t.deepEqual(ohauth.nonce().length, 6);
            t.end();
        });
        t.end();
    });

    t.test('#authHeader', function(t) {
        t.test('encodes an auth header', function(t) {
            t.deepEqual(ohauth.authHeader({ foo: 'bar' }), 'foo="bar"');
            t.end();
        });
        t.end();
    });

    t.test('#timestamp', function(t) {
        t.test('generates a numeric timestamp', function(t) {
            t.type(ohauth.timestamp(), 'number');
            t.end();
        });
        t.test('generates an integer timestamp', function(t) {
            t.deepEqual(ohauth.timestamp() % 1, 0);
            t.end();
        });
        t.end();
    });

    t.test('#percentEncode', function(t) {
        t.test('encodes spaces', function(t) {
            t.deepEqual(ohauth.percentEncode('foo bar'), 'foo%20bar');
            t.end();
        });
        t.end();
    });

    t.test('#headerGenerator', function(t) {
        t.test('generates a header function', function(t) {
            t.type(ohauth.headerGenerator({}), 'function');
            t.type(ohauth.headerGenerator({})('GET', 'http://foo.com/'), 'string');
            t.end();
        });
        t.end();
    });

    t.end();
});
