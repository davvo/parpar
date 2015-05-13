var parpar = require('..');

var scheme = {
    "street": {
        "required": true
    },
    "zip": {
        "type": "int",
        "required": true
    },
    "city": {
        "default": "Stockholm"
    },
    "longitude": "float",
    "latitude": "float",
    "type": {
        "required": true,
        "type": /^(house|apartment)$/
    },
    "forSale": "boolean"
};

var parse = parpar(scheme);

var params = parse({
    street: 'Upplandsgatan',
    zip: 80282,
    longitude: 17.172394,
    latitude: 60.667689,
    type: 'house',
    forSale: false
});

console.log(params);