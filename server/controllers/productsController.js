import products from '../database/db';
import validation from './validationLibrary';

class productsController {
  // Get all products
  static getAllProducts(req, resp, next) {
    products.query('SELECT * FROM products', (err, res) => {
      if (err) { return next(err); }

      return resp.status(200).json({
        products: res.rows,
        message: 'All the products',
      });
    });
  }

  // Get a single product
  static getSingleProduct(req, resp, next) {
    if (!validation.isNumber(req.params.id)) { return resp.status(400).json({ message: 'Please specify a number in the parameters list' }); }

    products.query('SELECT * FROM products WHERE id = $1', [req.params.id], (err, res) => {
      if (err) { return next(err); }

      // If any record is found... Else
      if (res.rows.length > 0) {
        return resp.status(200).json({
          product: res.rows[0],
          message: 'A single product record',
        });
      }
      return resp.status(404).json({ message: 'product not found' });
    });
    // return resp.status(404).json({ message: 'product not found' });
  }


  // Update a single product
  static updateSingleProduct(req, resp, next) {
    if (!validation.isNumber(req.params.id)) { return resp.status(400).json({ message: 'Please specify a number in the parameters list' }); }

    const validateBody = validation.validateBodyParamsForUpdating(req.body);
    if (validateBody) {
      return resp.status(400).json({
        message: validateBody,
        status: 'Validation error',
      });
    }


    const id = parseInt(req.params.id, 10);
    let productFound;


    products.query('SELECT * FROM products WHERE id = $1', [id], (err, res) => {
      if (err) { return next(err); }

      productFound = res.rows[0];

      if (productFound) {
        const updatedProduct = {
          id: productFound.id,
          title: req.body.title || productFound.title,
          image: req.body.image || productFound.image,
          description: req.body.description || productFound.description,
          price: req.body.price || productFound.price,
          quantity: req.body.quantity || productFound.quantity,
        };

        const {
          title, image, description, price, quantity,
        } = updatedProduct;


        // Update product
        products.query('UPDATE products SET (title, image, description, price, quantity) = ($1,$2,$3,$4,$5) WHERE id = $6 RETURNING *',
          [title, image, description, price, quantity, req.params.id], (errr, ress) => {
            if (errr) {
              return next(errr);
            }

            return resp.status(200).json({
              updatedProduct: ress.rows[0],
              message: 'product updated Successfully',
            });
          });
      } else return resp.status(404).send({ message: 'No product found' });
    });
    // return resp.status(400).json({ message: 'System Error. Product not updated' });
  }


  // Delete a single product.
  // *************************CONFIRMATION REQUIRED**************************
  static deleteSingleProduct(req, resp, next) {
    if (!validation.isNumber(req.params.id)) return resp.status(400).json({ message: 'Please specify a number in the parameters list' });

    const id = parseInt(req.params.id, 10);

    products.query('DELETE FROM products WHERE id = $1 RETURNING *', [id], (err, res) => {
      if (err) { return next(err); }

      // If any record is found... Else
      if (res && res.rows.length > 0) {
        return resp.status(201).json({
          product: res.rows[0],
          message: 'A single product deleted',
        });
      }
      return resp.status(404).json({ message: 'product not found' });
    });
  }


  // Create a single product
  static addNewProduct(req, resp, next) {
    const validateBody = validation.validateBodyParamsForCreating(req.body);
    if (validateBody) {
      return resp.status(400).json({
        message: validateBody,
        status: 'Validation error',
      });
    }

    const newProduct = {
      title: req.body.title,
      image: req.body.image || 'default_pix.png',
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    };


    const {
      title, description, price, quantity, image,
    } = newProduct;


    // Create product
    products.query('INSERT INTO products (title, description, price, quantity, image) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [title, description, price, quantity, image], (err, res) => {
        if (err) { return next(err); }

        return resp.status(201).json({
          new_product: res.rows[0],
          message: 'Product created Successfully',
        });
      });
  }
}

export default productsController;
