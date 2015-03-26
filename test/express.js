var parpar = require('..'),
    express = require('express');

var scheme = {
    "street": {
        "type": "string",
        "required": true
    },
    "zip": {
        "type": "int",
        "required": true
    },
    "longitude": {
        "type": "float",
    },
    "latitude": {
        "type": "float",
    }
};

var parse = parpar(scheme);

var app = express();

app.get('/', function (req, res) {

    console.log(req.query);

    parse(req.query, function (err, params) {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.send(params);
        }
    });

});

app.listen(8080);