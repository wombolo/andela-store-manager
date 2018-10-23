const products = require('../database/products');

class productsController {
    //Get all products
    static getAllProducts(req,res){
        return res.status(200).json({
            products,
            message: "All the products",
        });
    }


    //Get a single product
    static getSingleProduct(req,res){
        const findProduct = products.find(product => product.id === parseInt(req.params.id, 10));

        if (findProduct){
            return res.status(200).json({
                product: findProduct,
                message: "A single product record",
            })
        }

        return res.status(404).json({
            message: "Product not found",
        })
    }


    //Update a single product
    static updateSingleProduct(req,res){
        // const findProduct = products.find(product => product.id === parseInt(req.params.id, 10));
        // if (findProduct){
        //     return res.status(200).json({
        //         product: findProduct,
        //         message: "A single product record",
        //     })
        // }


        if (!req.body.title || !req.body.description || !req.body.price || !req.body.quantity){
            return res.status(400).json({
                message: 'A required detail is missing: title, description, price or quantity. Product not created',
            });
        }


        const id = parseInt(req.params.id,10);

        let productFound, itemIndex;

        products.map((product,index) => {
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

        const updatedProduct = {
            id: productFound.id,
            title: req.body.title || productFound.title,
            image: req.body.image || productFound.image,
            description: req.body.description || productFound.description,
            price: req.body.price || productFound.price,
            quantity: req.body.quantity || productFound.quantity
        };

        products.splice(itemIndex,1,updatedProduct);

        return res.status(200).json({
            updatedProduct,
            message: "Product updated Successfully",
        })

    }


    // Delete a single product
    static deleteSingleProduct(req,res){
        const id = parseInt(req.params.id,10);
        let deleted;

        products.map((product,index) => {
            if (product.id === id){
                products.splice(index,1);
                deleted = product;
            }
        });

        if (deleted){
            return res.status(200).json({
                product: deleted,
                message: 'product deleted',
            });
        }

        return res.status(404).json({
            message: "Product not found",
        })
    }


    //Create a single product
    static addNewProduct(req,res){
        if (!req.body.title || !req.body.description || !req.body.price || !req.body.quantity){
            return res.status(400).json({
                message: 'A required detail is missing: title, description, price or quantity. Product not created',
            });
        }

        const new_product = {
            id: products.length + 1,
            title: req.body.title,
            image: req.body.image || 'defaultpix.png',
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        };

        products.push(new_product);

        return res.status(201).json({
            new_product,
            message: "Product created Successfully",
        })
    }
}

module.exports = productsController;