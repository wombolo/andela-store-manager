const products = require('../database/products');

class productController {
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

}

module.exports = productController;