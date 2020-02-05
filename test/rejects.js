'use strict';

var tape = require('../');
var tap = require('tap');
var concat = require('concat-stream');
var inspect = require('object-inspect');
var assign = require('object.assign');

var stripFullStack = require('./common').stripFullStack;

tap.test('t.rejects', function (tt) {
    tt.plan(1);

    var test = tape.createHarness();
    test.createStream().pipe(concat(function (body) {
        tt.equal(
            stripFullStack(body.toString('utf8')),
            'TAP version 13\n'
            + '# non functions\n'
            + 'ok 1 should throw\n'
            + '\n1..36\n'
            + '# tests 36\n'
            + '# pass  33\n'
            + '# fail  3\n'
        );
    }));

    test('Rejected promises', { skip: typeof Promise !== 'function' }, function (t) {
        t.rejects(Promise.reject(2), /^2$/, 'rejects with 2');
        t.rejects(Promise.reject(3), /^2$/, 'does not reject with 3');

        t.end();
    });

    test('Resolved promises', { skip: typeof Promise !== 'function' }, function (t) {
        t.plan(2);

        t.rejects(Promise.resolve(2), /^2$/, 'resolves with 2');
        t.rejects(Promise.resolve(3), /^2$/, 'does not resolve with 3');
    });
});
