var Product = require('../models/Product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shoppingapp');

var products = [
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Product1',
        description: 'Lorem ipsum sit dolor amet',
        category: 'Others',
        price: 12
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Second',
        description: 'Lorem ipsum sit dolor amet',
        category: 'Others',
        price: 60
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Third',
        description: 'Lorem ipsum sit dolor amet',
        category: 'Others',
        price: 5
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Salcano bike',
        description: 'Awesome bicycle',
        category: 'Bicycle',
        price: 50
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Boot',
        description: 'Timberland',
        category: 'Shoe',
        price: 40
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Swatch',
        description: 'Swiss made',
        category: 'Watch',
        price: 150
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Lamb',
        description: 'Awesome lamb',
        category: 'Decoration',
        price: 55
    }),
    new Product({
        imagePath: 'https://unsplash.it/g/200/200',
        title: 'Musicbox',
        description: 'Dolores sit amet',
        category: 'Music',
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