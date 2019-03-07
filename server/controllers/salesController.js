import dbConfig from '../database/db';
import validation from './Helpers';

class salesController {
  // Get all sales
  static getAllSales(req, resp, next) {

    let queryOneSale;
    let paramsOneSale;

    // If requester is admin:
    if (req.auth_token.profile.role === 'admin') {
      queryOneSale = 'SELECT * FROM sales';
    } else {
      // Store attendant can only view sale made by him
      queryOneSale = 'SELECT * FROM sales WHERE profile_id = $1';
      paramsOneSale = [req.auth_token.profile.id];
    }

    dbConfig.query(queryOneSale, paramsOneSale, (err, res) => {
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

    const requestId = req.params.id;
    let queryOneSale;
    let paramsOneSale;

    // If requester is admin:
    if (req.auth_token.profile.role === 'admin') {
      queryOneSale = 'SELECT * FROM sales WHERE id = $1';
      paramsOneSale = [requestId];
    } else {
      // Store attendant can only view sale made by him
      queryOneSale = 'SELECT * FROM sales WHERE id = $1 AND profile_id = $2';
      paramsOneSale = [requestId, req.auth_token.profile.id];
    }


    dbConfig.query(queryOneSale, paramsOneSale, (err, res) => {
      if (err) { return next(err); }

      if (res.rows.length > 0) {
        return resp.status(200).json({
          sale: res.rows[0],
          message: 'A single sale record',
        });
      }
      if (paramsOneSale.length > 1) {
        // i.e. is store attenant trying to access sale h doesn't own
        return resp.status(400).json({ message: 'Unable to get sale record. As its not yours' });
      }
      return resp.status(404).json({ message: 'sale not found' });
    });
  }


  // Update a single sale
  // static updateSingleSale(req, resp, next) {
  //   if (!validation.isNumber(req.params.id)) { return resp.status(400).json({ message: 'Please specify a number in the parameters list' }); }
  //
  //   const validateBody = validation.validateBodyParamsForUpdating(req.body);
  //   if (validateBody) {
  //     return resp.status(400).json({
  //       message: validateBody,
  //       status: 'Validation error',
  //     });
  //   }
  //
  //   const id = parseInt(req.params.id, 10);
  //   let saleFound;
  //
  //
  //   dbConfig.query('SELECT * FROM sales WHERE id = $1', [id], (err, res) => {
  //     if (err) { return next(err); }
  //
  //     saleFound = res.rows[0];
  //
  //     if (saleFound) {
  //       const updatedSale = {
  //         id: saleFound.id,
  //         productId: saleFound.product_id,
  //         title: req.body.title || saleFound.title,
  //         description: req.body.description || saleFound.description,
  //         price: req.body.price || saleFound.price,
  //         quantity: req.body.quantity || saleFound.quantity,
  //         profileId: req.auth_token.profile.id || saleFound.profile_id,
  //       };
  //
  //       const {
  //         productId, title, description, price, quantity, profileId,
  //       } = updatedSale;
  //
  //
  //       // Update sale
  //       dbConfig.query('UPDATE sales SET (product_id, title, description, price, quantity, profile_id ) = ($1,$2,$3,$4,$5,$6) WHERE id = $7 RETURNING *',
  //         [productId, title, description, price, quantity, profileId, id], (errr, ress) => {
  //           if (errr) return next(errr);
  //
  //           return resp.status(200).json({
  //             updatedSale: ress.rows[0],
  //             message: 'sale updated Successfully',
  //           });
  //         });
  //     } else return resp.status(404).send({ message: 'No sale found' });
  //   });
  // }


  static deleteSingleSale(req, resp, next) {
    if (!validation.isNumber(req.params.id)) return resp.status(400).json({ message: 'Please specify a number in the parameters list' });

    const id = parseInt(req.params.id, 10);

    dbConfig.query('DELETE FROM sales WHERE id = $1 RETURNING *', [id], (err, res) => {
      if (err) { return next(err); }

      // If any record is found... Else
      if (res && res.rows.length > 0) {
        return resp.status(200).json({
          sale: res.rows[0],
          message: 'A single sale deleted',
        });
      }
      return resp.status(404).json({ message: 'sale not found' });
    });
  }


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

    const newSale = {
      productId: requestProductId || 2,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      profileId: req.auth_token.profile.id,
    };

    const {
      productId, title, description, price, quantity, profileId,
    } = newSale;


    // Create sale
    dbConfig.query('INSERT INTO sales (product_id, title, description, price, quantity, profile_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [productId, title, description, price, quantity, profileId], (err, res) => {
        if (err) { return next(err); }

        // SPIT OUT ERROR FOR UNKNOWKN PROD_ID FROM FOREGIN KEY
        return resp.status(201).json({
          newSale: res.rows[0],
          message: 'Sale created Successfully',
        });
      });
  }
}

export default salesController;
