var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/test');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    _id: String,
    name: String
});

var products = mongoose.model("products", productSchema);

module.exports = products;