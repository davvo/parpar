# parpar
Parse request parameters

## Install
```sh
> npm install parpar
```

## Example
```sh
var parpar = require('parpar');

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
        "type": "float"
    },
    "latitude": {
        "type": "float"
    }
};

var parse = parpar(scheme);

var params = parse({
    street: 'Upplandsgatan',
    zip: '80282',
    longitude: '17.172394',
    latitude: '60.667689'
});

console.log(params);
```

## Example using express
```sh
var parpar = require('parpar'),
    express = require('express'),
    app = express();

var scheme = require('./scheme.json'),
    parse = parpar(scheme);

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
```
