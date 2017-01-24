var Product = require('../models/Product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shoppingapp');

var products = [
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Product1',
        description: 'Lorem ipsum sit dolor amet',
        price: 12
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Second',
        description: 'Lorem ipsum sit dolor amet',
        price: 60
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Third',
        description: 'Lorem ipsum sit dolor amet',
        price: 5
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Salcano bike',
        description: 'Awesome bicycle',
        price: 50
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Boot',
        description: 'Timberland',
        price: 40
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Watch',
        description: 'Swatch',
        price: 150
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Lamb',
        description: 'Awesome lamb',
        price: 55
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Musicbox',
        description: 'Dolores sit amet',
        price: 35
    })
];

var done = 0;
for(var i=0; i < products.length; i++){
    products[i].save(function(err, result){
        done++;
        if(done == products.length){
            mongoose.disconnect();
        }
    });
}

mongoose.disconnect();