var parpar = require('../lib/parpar.js');

var scheme = {
    "streetName": {
        "type": "string",
        "required": true
    },
    "streetNumber": {
        "type": "string",
        "required": true
    },
    "zip": {
        "type": "int",
        "required": true
    },
    "longitude": {
        "type": "float",
        "required": false
    }
};

var parse = parpar(scheme);

parse({
    streetName: 'adsf',
    streetNumber: '123adsf',
    zip: '0123',
    longitude: '1.2asdf'
}, function (err, params) {
    console.log(err, params);
});