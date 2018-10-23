'use strict';

var express = require('express'),
    db = require('./database/db'),
    body_parser = require('body-parser');

var PORT = 5000,
    app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

//Retrieve all products
app.get('/api/v1/products', function (req, res) {
    res.status(200).send({
        success: true,
        message: 'Products retrieved successfully',
        products: db
    });
});

//Retrieve all single product
app.get('/api/v1/product/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);

    db.map(function (product) {
        if (product.id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'product retrieved successfully',
                product: product
            });
        }
    });

    return res.status(404).send({
        success: 'false',
        message: 'product doesn\'t exist'
    });
});

//Update a product
app.put('/api/v1/product/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);

    var productFound = void 0,
        itemIndex = void 0;

    db.map(function (product, index) {
        if (product.id === id) {
            productFound = product;
            itemIndex = index;
        }
    });

    if (!productFound) {
        return res.status(404).send({
            success: 'false',
            message: 'product not found'
        });
    }

    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }

    var updatedProduct = {
        id: productFound.id,
        title: req.body.title || productFound.title,
        description: req.body.description || productFound.description
    };

    //Replace index[1] with updatedProduct
    db.splice(itemIndex, 1, updatedProduct);

    return res.status(404).send({
        success: 'true',
        message: 'product updated',
        updatedProduct: updatedProduct
    });
});

//Delete a product
app.delete('/api/v1/product/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);

    db.map(function (product, index) {
        if (product.id === id) {
            db.splice(index, 1);

            return res.status(404).send({
                success: 'true',
                message: 'product deleted'
            });
        }
    });

    return res.status(404).send({
        success: 'false',
        message: 'todo not found'
    });
});

app.post('/api/v1/products', function (req, res) {
    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }

    var product = {
        id: db.length + 1,
        title: req.body.title,
        description: req.body.description
    };

    db.push(product);

    return res.status(201).send({
        success: 'true',
        message: 'Product added successfully',
        product: product
    });
});

app.listen(PORT, function () {
    console.log('server running on port: ' + PORT);
});