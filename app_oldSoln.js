const express = require('express'),
    db = require('./database/db'),
    body_parser = require('body-parser');

const PORT = 5000, app_oldSoln = express();

app_oldSoln.use(body_parser.json());
app_oldSoln.use(body_parser.urlencoded({ extended: false }));

//Retrieve all products
app_oldSoln.get('/api/v1/products', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Products retrieved successfully',
        products: db
    });
});






//Retrieve all single product
app_oldSoln.get('/api/v1/product/:id', (req, res) =>{
    const id = parseInt(req.params.id,10);

    db.map((product) => {
        if (product.id === id){
            return res.status(200).send({
                success: 'true',
                message: 'product retrieved successfully',
                product
            });
        }
    });

    return res.status(404).send({
        success: 'false',
        message: 'product doesn\'t exist',
    });
});








//Update a product
app_oldSoln.put('/api/v1/product/:id', (req, res) =>{
    const id = parseInt(req.params.id,10);

    let productFound, itemIndex;

    db.map((product,index) => {
        if (product.id === id){
            productFound = product;
            itemIndex = index;
        }
    });

    if (!productFound){
        return res.status(404).send({
            success: 'false',
            message: 'product not found',
        });
    }


    if (!req.body.title){
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    }
    else if (!req.body.description){
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }


    const updatedProduct = {
        id: productFound.id,
        title: req.body.title || productFound.title,
        description: req.body.description || productFound.description,
    };

    //Replace index[1] with updatedProduct
    db.splice(itemIndex,1,updatedProduct);

    return res.status(404).send({
        success: 'true',
        message: 'product updated',
        updatedProduct,
    });
});






//Delete a product
app_oldSoln.delete('/api/v1/product/:id', (req, res) =>{
    const id = parseInt(req.params.id,10);

    db.map((product,index) => {
        if (product.id === id){
            db.splice(index,1);

            return res.status(404).send({
                success: 'true',
                message: 'product deleted',
            });
        }
    });

    return res.status(404).send({
        success: 'false',
        message: 'product not found',
    });

});



app_oldSoln.post('/api/v1/products', (req, res) => {
    if (!req.body.title){
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    }
    else if (!req.body.description){
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }

    const product = {
        id: db.length+1,
        title: req.body.title,
        description: req.body.description
    };

    db.push(product);

    return res.status(201).send({
        success: 'true',
        message: 'Product added successfully',
        product
    });
});



app_oldSoln.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});

module.exports = app_oldSoln;