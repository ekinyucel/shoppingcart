const express = require('express');
const router =  express.Router();
const mongoDb = require("../model/mongo");


const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

router.get('/', (req, res) => {
    res.send("api works");
});

router.get('/products', (req, res) => {
    var response = {};
    mongoDb.find({} , function(err, data){
        if(err) { response = {"error" : true, "message" : "Error fetching data"}; console.log(err.stack); }
        else { response =  data  };
        res.json(response);
    });
    /*axios.get(`${API}/posts`)
    .then(posts => {
        res.status(200).json(posts.data);
    })
    .catch(error => {
        res.status(500).send(error);
    });*/
});

module.exports = router;