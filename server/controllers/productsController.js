import products from '../database/products';
import validation from './validationLibrary';

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

        if (!validation.validateNumber(req.params.id))
            return res.status(400).json({message: "Please specify a number in the parameters list"})


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
        if (!validation.validateNumber(req.params.id))
            return res.status(400).json({message: "Please specify a number in the parameters list"})


        let validateBody = validation.validateBodyParamsForUpdating(req.body);
        if (validateBody){
            return res.status(400).json({
                message: validateBody,
                status: 'Validation error'
            })
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
        if (!validation.validateNumber(req.params.id))
            return res.status(400).json({message: "Please specify a number in the parameters list"})

        const id = parseInt(req.params.id,10);
        let remainingProducts;

        products.map((product,index) => {
            if (product.id === id){
                products.splice(index,1);
                remainingProducts = product;
            }
        });

        if (remainingProducts){
            return res.status(200).json({
                product: remainingProducts,
                message: 'product deleted',
            });
        }

        return res.status(404).json({
            message: "Product not found",
        })
    }


    //Create a single product
    static addNewProduct(req,res){

        let validateBody = validation.validateBodyParamsForCreating(req.body);
        if (validateBody){
            return res.status(400).json({
                message: validateBody,
                status: 'Validation error'
            })
        }

        const new_product = {
            id: products.length + 1,
            title: req.body.title,
            image: req.body.image || 'default_pix.png',
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

export default productsController;