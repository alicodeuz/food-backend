var ProductModel = require('../models/ProductModel.js');
const { deleteImage } = require('../utils/index.js');

/**
 * ProductController.js
 *
 * @description :: Server-side logic for managing Products.
 */
module.exports = {
  list: function (req, res) {
    // #swagger.tags = ['Products']
    return ProductModel.find(function (err, Products) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Product.',
          error: err
        });
      }

      return res.json(Products);
    });
  },
  search: function (req, res) {
    const { name } = req.query;
    // #swagger.tags = ['Products']

    return ProductModel.find({ name: { $regex: `^${name}`, $options: 'i' } },
      function (err, Products) {
        if (err) {
          return res.status(500).json({
            message: 'Error when getting Product.',
            error: err
          });
        }

        return res.json(Products);
      });
  },

  show: function (req, res) {
    // #swagger.tags = ['Products']
    var id = req.params.id;

    return ProductModel.findOne({ _id: id }, function (err, Product) {
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


  create: function (req, res) {
    // #swagger.tags = ['Products']
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

    return Product.save(function (err, Product) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Product',
          error: err
        });
      }

      return res.status(201).json(Product);
    });
  },

  update: function (req, res) {
    // #swagger.tags = ['Products']
    var id = req.params.id;

    return ProductModel.findOne({ _id: id }, function (err, Product) {
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
      Product.image = req.file?.path ? req.file?.path?.replace('public', '') : Product.image;
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

  remove: function (req, res) {
    // #swagger.tags = ['Products']
    var id = req.params.id;

    return ProductModel.findByIdAndRemove(id, function (err, Product) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Product.',
          error: err
        });
      }
      try {
        deleteImage(Product.image);
      } catch (err) {
        console.log(err);
      }

      return res.status(204).json({ success: true });
    });
  }
};
