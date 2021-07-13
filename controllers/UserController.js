var UserModel = require('../models/UserModel.js');

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {

  /**
   * UserController.list()
   */
  list: function (req, res) {
    console.log('Hey')
    return UserModel.find(function (err, Users) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting User.',
          error: err
        });
      }

      return res.json(Users);
    });
  },

  /**
   * UserController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    return UserModel.findOne({ _id: id }, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting User.',
          error: err
        });
      }

      if (!User) {
        return res.status(404).json({
          message: 'No such User'
        });
      }

      return res.json(User);
    });
  },

  /**
   * UserController.create()
   */
  create: function (req, res) {
    var User = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      lang: req.body.lang,
      image: req.body.image,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address
    });

    return User.save(function (err, User) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating User',
          error: err
        });
      }

      return res.status(201).json(User);
    });
  },

  /**
   * UserController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    return UserModel.findOne({ _id: id }, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting User',
          error: err
        });
      }

      if (!User) {
        return res.status(404).json({
          message: 'No such User'
        });
      }

      User.firstName = req.body.firstName ? req.body.firstName : User.firstName;
      User.lastName = req.body.lastName ? req.body.lastName : User.lastName;
      User.lang = req.body.lang ? req.body.lang : User.lang;
      User.image = req.body.image ? req.body.image : User.image;
      User.email = req.body.email ? req.body.email : User.email;
      User.password = req.body.password ? req.body.password : User.password;
      User.phone = req.body.phone ? req.body.phone : User.phone;
      User.address = req.body.address ? req.body.address : User.address;

      User.save(function (err, User) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating User.',
            error: err
          });
        }

        return res.json(User);
      });
    });
  },

  /**
   * UserController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    return UserModel.findByIdAndRemove(id, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the User.',
          error: err
        });
      }

      return res.status(204).json();
    });
  }
};
