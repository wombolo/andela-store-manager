import sales from '../database/db';
import validation from './validationLibrary';

class salesController {
  // Get all sales
  static getAllSales(req, resp, next) {
    sales.query('SELECT * FROM sales', (err, res) => {
      if (err) { return next(err); }

      return resp.status(200).json({
        sales: res.rows,
        message: 'All the sales',
      });
    });
  }

  // Get a single sale
  static getSingleSale(req, resp, next) {
    if (!validation.isNumber(req.params.id)) { return resp.status(400).json({ message: 'Please specify a number in the parameters list' }); }

    sales.query('SELECT * FROM sales WHERE id = $1', [req.params.id], (err, res) => {
      if (err) { return next(err); }

      // If any record is found... Else
      if (res.rows.length > 0) {
        return resp.status(200).json({
          sale: res.rows[0],
          message: 'A single sale record',
        });
      }
      return resp.status(404).json({ message: 'sale not found' });
    });
    // return resp.status(404).json({ message: 'sale not found' });
  }


  // Update a single sale
  static updateSingleSale(req, resp, next) {
    if (!validation.isNumber(req.params.id)) { return resp.status(400).json({ message: 'Please specify a number in the parameters list' }); }

    const validateBody = validation.validateBodyParamsForUpdating(req.body);
    if (validateBody) {
      return resp.status(400).json({
        message: validateBody,
        status: 'Validation error',
      });
    }

    const id = parseInt(req.params.id, 10);
    let saleFound;


    sales.query('SELECT * FROM sales WHERE id = $1', [id], (err, res) => {
      if (err) { return next(err); }

      saleFound = res.rows[0];

      if (saleFound) {
        const updatedSale = {
          id: saleFound.id,
          product_id: saleFound.product_id,
          title: req.body.title || saleFound.title,
          description: req.body.description || saleFound.description,
          price: req.body.price || saleFound.price,
          quantity: req.body.quantity || saleFound.quantity,
        };

        const {
          product_id, title, description, price, quantity,
        } = updatedSale;


        // Update sale
        sales.query('UPDATE sales SET (product_id, title, description, price, quantity) = ($1,$2,$3,$4,$5) WHERE id = $6 RETURNING *',
          [product_id, title, description, price, quantity, id], (errr, ress) => {
            if (errr) {
              return next(errr);
            }

            return resp.status(200).json({
              updatedSale: ress.rows[0],
              message: 'sale updated Successfully',
            });
          });
      } else return resp.status(404).send({ message: 'No sale found' });
    });
    // return resp.status(400).json({ message: 'System Error. Sale not updated' });
  }


  // Delete a single sale.
  // *************************CONFIRMATION REQUIRED**************************
  static deleteSingleSale(req, resp, next) {
    if (!validation.isNumber(req.params.id)) return resp.status(400).json({ message: 'Please specify a number in the parameters list' });

    const id = parseInt(req.params.id, 10);

    sales.query('DELETE FROM sales WHERE id = $1 RETURNING *', [id], (err, res) => {
      if (err) { return next(err); }

      // If any record is found... Else
      if (res && res.rows.length > 0) {
        return resp.status(201).json({
          sale: res.rows[0],
          message: 'A single sale deleted',
        });
      }
      return resp.status(404).json({ message: 'sale not found' });
    });
  }


  // Create a single sale
  static addNewSale(req, resp, next) {
    const validateBody = validation.validateBodyParamsForCreating(req.body);
    if (validateBody) {
      return resp.status(400).json({
        message: validateBody,
        status: 'Validation error',
      });
    }

    let requestProductId = req.body.product_id;
    if (!validation.isNumber(requestProductId)) requestProductId = null;

    const new_sale = {
      product_id: requestProductId || 2,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    const {
      product_id, title, description, price, quantity,
    } = new_sale;


    // Create sale
    sales.query('INSERT INTO sales (product_id, title, description, price, quantity) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [product_id, title, description, price, quantity], (err, res) => {
        if (err) { return next(err); }

        // SPIT OUT ERROR FOR UNKNOWKN PROD_ID FROM FOREGIN KEY
        return resp.status(201).json({
          new_sale: res.rows[0],
          message: 'Sale created Successfully',
        });
      });
  }
}

export default salesController;
