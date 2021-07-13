var CategoryModel = require('../models/CategoryModel.js');

/**
 * CategoryController.js
 *
 * @description :: Server-side logic for managing Categorys.
 */
module.exports = {

  /**
   * CategoryController.list()
   */
  list: function (req, res) {
    return CategoryModel.find(function (err, Categorys) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Category.',
          error: err
        });
      }

      return res.json(Categorys);
    });
  },

  /**
   * CategoryController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    return CategoryModel.findOne({ _id: id }, function (err, Category) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Category.',
          error: err
        });
      }

      if (!Category) {
        return res.status(404).json({
          message: 'No such Category'
        });
      }

      return res.json(Category);
    });
  },

  /**
   * CategoryController.create()
   */
  create: function (req, res) {
    var Category = new CategoryModel({
      name: req.body.name,
      user: req.body.user,
      user: req.body.user,
      count: req.body.count
    });

    return Category.save(function (err, Category) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Category',
          error: err
        });
      }

      return res.status(201).json(Category);
    });
  },

  /**
   * CategoryController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    return CategoryModel.findOne({ _id: id }, function (err, Category) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Category',
          error: err
        });
      }

      if (!Category) {
        return res.status(404).json({
          message: 'No such Category'
        });
      }

      Category.name = req.body.name ? req.body.name : Category.name;
      Category.user = req.body.user ? req.body.user : Category.user;
      Category.user = req.body.user ? req.body.user : Category.user;
      Category.count = req.body.count ? req.body.count : Category.count;

      Category.save(function (err, Category) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating Category.',
            error: err
          });
        }

        return res.json(Category);
      });
    });
  },

  /**
   * CategoryController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    return CategoryModel.findByIdAndUpdate(id, { isDeleted: true }, function (err, Category) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Category.',
          error: err
        });
      }

      return res.status(204).json();
    });
  }
};
