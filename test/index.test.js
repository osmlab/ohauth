'use strict';

var test = require('tap').test;
var ohauth = require('../.');

test('ohauth', function(t) {
  t.test('#qsString', function(t) {
    t.test('turns an object into a querystring', function(t) {
      t.same(ohauth.qsString({ foo: 1 }), 'foo=1');
      t.end();
    });
    t.test('escapes special characters', function(t) {
      t.same(ohauth.qsString({ '!\'*()': '!\'*()' }), '%21%27%2A%28%29=%21%27%2A%28%29');
      t.end();
    });
    t.end();
  });

  t.test('#stringQs', function(t) {
    t.test('turns a querystring into an object', function(t) {
      t.same(ohauth.stringQs('foo=1'), { foo: 1 });
      t.end();
    });
    t.test('handles special characters', function(t) {
      t.same(ohauth.stringQs('%21%27%2A%28%29=%21%27%2A%28%29'), { '!\'*()': '!\'*()' });
      t.end();
    });
    t.test('handles querystrings with empty arguments', function(t) {
      t.same(ohauth.stringQs(''), {});
      t.same(ohauth.stringQs('foo=1&'), { foo: 1 });
      t.end();
    });
    t.end();
  });

  t.test('#percentEncode', function(t) {
    t.test('encodes spaces', function(t) {
      t.same(ohauth.percentEncode('foo bar'), 'foo%20bar');
      t.end();
    });
    t.end();
  });

  t.end();
});
