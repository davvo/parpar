"use strict";

var assert = require('assert');

function castValue(name, value, type) {
    try {
        if (type === 'int') {
            assert.equal(value, parseInt(value))
            return parseInt(value);
        }
        if (type === 'float') {
            assert.equal(value, parseFloat(value));
            return parseFloat(value);
        }
        return value;
    } catch (x) {
        throw new Error('Parameter ' + name + ' must be of type ' + type);
    }
}

function parse(scheme, obj, callback) {
    var err, params = {};
    try {
        Object.keys(scheme).forEach(function (name) {
            var rule = scheme[name],
                value = obj[name];
            if (!value && rule.required) {
                throw ('Missing required parameter ' + name);
            }
            params[name] = castValue(name, value, rule.type);
        });
    } catch (x) {
        err = x;
    }
    if (callback) {
        process.nextTick(callback.bind(null, err, params));
    } else if (err) {
        throw err;
    } else {
        return params;
    }
}

module.exports = function (scheme) {
    return parse.bind(null, scheme);
};