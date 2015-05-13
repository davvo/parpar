"use strict";

var assert = require('assert');

function isRegex(type) {
    return Object.prototype.toString.call(type) == '[object RegExp]';
}

function castValue(name, type, value) {
    try {
        value = value.toString();
        if (type === 'int') {
            assert.equal(value, parseInt(value))
            return parseInt(value);
        }
        if (type === 'float') {
            assert.equal(value, parseFloat(value));
            return parseFloat(value);
        }
        if (type === 'boolean') {
            assert(value === 'true' || value === 'false');
            return value === 'true';
        }
        if (isRegex(type)) {
            assert(type.test(value));
            return value;
        }
        assert.equal(typeof value, "string");
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
            if (typeof rule === 'string' || isRegex(rule)) {
                rule = {type: rule};
            }
            if (value instanceof Array) {
                params[name] = value.map(castValue.bind(null, name, rule.type));
            } else if (value !== undefined) {
                params[name] = castValue(name, rule.type, value);
            } else if (rule.required) {
                throw new Error('Missing required parameter ' + name);
            } else if (rule.default !== undefined) {
                params[name] = rule.default;
            }
        });
    } catch (e) {
        err = e
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
    if (typeof scheme === "string") {
        scheme = require(scheme);
    }
    return parse.bind(null, scheme);
};