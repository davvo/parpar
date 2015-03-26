var express = require('express');
    app = express();

var parse = require('..')(__dirname + '/scheme.json');

app.get('/', function (req, res) {
    parse(req.query, function (err, params) {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.send(params);
        }
    });
});

app.listen(8080);