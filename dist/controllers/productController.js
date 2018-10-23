"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var products = require('../database/products');

var productController = function () {
    function productController() {
        _classCallCheck(this, productController);
    }

    _createClass(productController, null, [{
        key: "getAllProducts",


        //Get all products
        value: function getAllProducts(req, res) {
            return res.status(200).json({
                products: products,
                message: "All the products"
            });
        }

        //Get a single product

    }, {
        key: "getSingleProduct",
        value: function getSingleProduct(req, res) {
            var findProduct = products.find(function (product) {
                return product.id === parseInt(req.params.id, 10);
            });

            if (findProduct) {
                return res.status(200).json({
                    product: findProduct,
                    message: "A single product record"
                });
            }

            return res.status(404).json({
                message: "Product not found"

            });
        }
    }]);

    return productController;
}();

module.exports = productController;