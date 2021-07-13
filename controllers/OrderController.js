var OrderModel = require('../models/OrderModel.js');

/**
 * OrderController.js
 *
 * @description :: Server-side logic for managing Orders.
 */
module.exports = {
  list: function (req, res) {
    // #swagger.tags = ['Orders']
    return OrderModel.find(function (err, Orders) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Order.',
          error: err
        });
      }

      return res.json(Orders);
    });
  },

  show: function (req, res) {
    // #swagger.tags = ['Orders']
    var id = req.params.id;

    return OrderModel.findOne({ _id: id }, function (err, Order) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Order.',
          error: err
        });
      }

      if (!Order) {
        return res.status(404).json({
          message: 'No such Order'
        });
      }

      return res.json(Order);
    });
  },
  create: function (req, res) {
    // #swagger.tags = ['Orders']
    var Order = new OrderModel({
      total: req.body.total,
      subTotal: req.body.subTotal,
      tax: req.body.tax,
      taxType: req.body.taxType,
      products: req.body.products,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      user: req.body.user,
      string: req.body.string,
      date: req.body.date
    });

    Order.save(function (err, Order) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Order',
          error: err
        });
      }

      return res.status(201).json(Order);
    });
  },

  update: function (req, res) {
    // #swagger.tags = ['Orders']
    var id = req.params.id;

    return OrderModel.findOne({ _id: id }, function (err, Order) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Order',
          error: err
        });
      }

      if (!Order) {
        return res.status(404).json({
          message: 'No such Order'
        });
      }

      Order.total = req.body.total ? req.body.total : Order.total;
      Order.subTotal = req.body.subTotal ? req.body.subTotal : Order.subTotal;
      Order.tax = req.body.tax ? req.body.tax : Order.tax;
      Order.taxType = req.body.taxType ? req.body.taxType : Order.taxType;
      Order.products = req.body.products ? req.body.products : Order.products;
      Order.createdAt = req.body.createdAt ? req.body.createdAt : Order.createdAt;
      Order.updatedAt = req.body.updatedAt ? req.body.updatedAt : Order.updatedAt;
      Order.user = req.body.user ? req.body.user : Order.user;
      Order.string = req.body.string ? req.body.string : Order.string;
      Order.date = req.body.date ? req.body.date : Order.date;

      Order.save(function (err, Order) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating Order.',
            error: err
          });
        }

        return res.json(Order);
      });
    });
  },


  remove: function (req, res) {
    // #swagger.tags = ['Orders']
    var id = req.params.id;

    return OrderModel.findByIdAndRemove(id, function (err, Order) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Order.',
          error: err
        });
      }

      return res.status(204).json();
    });
  }
};
