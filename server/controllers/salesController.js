import sales from '../database/sales';
import validation from './validationLibrary';

class salesController{
    //Get all sales
    static getAllSales(req,res){
        return res.status(200).json({
            sales,
            message: "All the sales",
        });
    }


    //Get a single sale
    static getSingleSale(req,res){

        if (!validation.validateNumber(req.params.id))
            return res.status(400).json({message: "Please use a number as ID"})


        const findSale = sales.find(sale => sale.id === parseInt(req.params.id, 10));

        if (findSale){
            return res.status(200).json({
                sale: findSale,
                message: "A single sale record",
            })
        }

        return res.status(404).json({
            message: "sale record not found",
        })
    }


    //Update a single sale
    static updateSingleSale(req,res){
        let validateBody = validation.validateBodyParamsForUpdating(req.body);
        if (validateBody){
            return res.status(400).json({
                message: validateBody,
                status: 'Validation error'
            })
        }

        const id = parseInt(req.params.id,10);

        let saleFound, itemIndex;

        sales.map((sale,index) => {
            if (sale.id === id){
                saleFound = sale;
                itemIndex = index;
            }
        });

        if (!saleFound){
            return res.status(404).send({
                success: 'false',
                message: 'sale not found',
            });
        }

        const updatedSale = {
            id: saleFound.id,
            product_id: saleFound.product_id,
            title: req.body.title || saleFound.title,
            image: req.body.image || saleFound.image,
            description: req.body.description || saleFound.description,
            price: req.body.price || saleFound.price,
            quantity: req.body.quantity || saleFound.quantity
        };

        sales.splice(itemIndex, 1, updatedSale);

        return res.status(200).json({
            updatedProduct: updatedSale,
            message: "sale updated Successfully",
        })
    }


    // Delete a single sale
    static deleteSingleSale(req,res){
        if (!validation.validateNumber(req.params.id))
            return res.status(400).json({message: "Please use a number as ID"});

        const id = parseInt(req.params.id,10);
        let remainingSales;

        sales.map((sale,index) => {
            if (sale.id === id){
                sales.splice(index,1);
                remainingSales = sale;
            }
        });

        if (remainingSales){
            return res.status(200).json({
                sale: remainingSales,
                message: 'sale deleted',
            });
        }

        return res.status(404).json({
            message: "Sale not found",
        })
    }


    //Create a single sale
    static addNewSale(req,res){
        let validateBody = validation.validateBodyParamsForCreating(req.body);
        if (validateBody){
            return res.status(400).json({
                message: validateBody,
                status: 'Validation error'
            })
        }

        const new_sale = {
            id: sales.length + 1,
            product_id: req.body.product_id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        };

        sales.push(new_sale);

        return res.status(201).json({
            new_sale: new_sale,
            message: "sale created Successfully",
        })
    }
}

export default salesController;