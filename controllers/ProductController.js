var ProductModel = require('../models/ProductModel.js');

/**
 * ProductController.js
 *
 * @description :: Server-side logic for managing Products.
 */
module.exports = {

  /**
   * ProductController.list()
   */
  list: function (req, res) {
    ProductModel.find(function (err, Products) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Product.',
          error: err
        });
      }

      return res.json(Products);
    });
  },

  /**
   * ProductController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    ProductModel.findOne({ _id: id }, function (err, Product) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Product.',
          error: err
        });
      }

      if (!Product) {
        return res.status(404).json({
          message: 'No such Product'
        });
      }

      return res.json(Product);
    });
  },

  /**
   * ProductController.create()
   */
  create: function (req, res) {
    console.log(req.file, "image")
    var Product = new ProductModel({
      name: req.body.name,
      price: req.body.price,
      salePrice: req.body.salePrice,
      description: req.body.description,
      category: req.body.category,
      image: req.file?.path.replace("public", ""),
      rate: req.body.rate,
      user: req.body.user
    });

    Product.save(function (err, Product) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Product',
          error: err
        });
      }

      return res.status(201).json(Product);
    });
  },

  /**
   * ProductController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    ProductModel.findOne({ _id: id }, function (err, Product) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Product',
          error: err
        });
      }

      if (!Product) {
        return res.status(404).json({
          message: 'No such Product'
        });
      }

      Product.name = req.body.name ? req.body.name : Product.name;
      Product.price = req.body.price ? req.body.price : Product.price;
      Product.salePrice = req.body.salePrice ? req.body.salePrice : Product.salePrice;
      Product.description = req.body.description ? req.body.description : Product.description;
      Product.category = req.body.category ? req.body.category : Product.category;
      Product.image = req.body.image ? req.body.image : Product.image;
      Product.rate = req.body.rate ? req.body.rate : Product.rate;
      Product.user = req.body.user ? req.body.user : Product.user;

      Product.save(function (err, Product) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating Product.',
            error: err
          });
        }

        return res.json(Product);
      });
    });
  },

  /**
   * ProductController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    ProductModel.findByIdAndRemove(id, function (err, Product) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Product.',
          error: err
        });
      }

      return res.status(204).json();
    });
  }
};
