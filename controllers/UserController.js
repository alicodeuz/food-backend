var UserModel = require('../models/UserModel.js');

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {
  me: function (req, res) {
    // #swagger.tags = ['Users'];
    // #swagger.description = 'Current user information'
    /* #swagger.parameters['body'] = {    
       in: 'body',
       description: 'Current user information',
       required: true,
       type: 'obj',
       schema: { $ref: '#/definitions/SIGN_UP' }
    } */
    /* #swagger.responses[200] = {
            description: 'Response body',
            schema: {$ref: '#/definitions/USER'}
    } */
    /* #swagger.responses[400] = {
            description: 'Error messages',
           schema: {
              success: false,
              msg: 'Something went wrong'
          }
    } */

    return UserModel.findById(req.locals._id, function (err, Users) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting User.',
          error: err
        });
      }

      return res.json(Users);
    });
  },

  list: function (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Get all users list'
    /* #swagger.parameters['body'] = {    
       in: 'body',
       description: 'Get all users list',
       required: true,
       type: 'obj',
       schema: { $ref: '#/definitions/SIGN_UP' }
    } */
    /* #swagger.responses[200] = {
            description: 'Response body',
            schema: [{$ref: '#/definitions/USER'}]
    } */
    /* #swagger.responses[400] = {
            description: 'Error messages',
           schema: {
              success: false,
              msg: 'Something went wrong'
          }
    } */
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

  show: function (req, res) {
    // #swagger.tags = ['Users']
    var id = req.params.id;

    return UserModel.findOne({ _id: id }, function (err, User) {
      /* #swagger.parameters['body'] = {    
       in: 'body',
       description: 'Get user by id',
       required: true,
       type: 'obj',
       schema: { $ref: '#/definitions/SIGN_UP' }
    } */
      /* #swagger.responses[200] = {
              description: 'Response body',
              schema: [{$ref: '#/definitions/USER'}]
      } */
      /* #swagger.responses[400] = {
              description: 'Error messages',
             schema: {
                success: false,
                msg: 'Something went wrong'
            }
      } */
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

  create: function (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Only Admin can update a user or User can update his account'
    /* #swagger.security = [{
               "apiKeyAuth": []
        }] */
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

  update: function (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Only Admin can update a user or User can update his account'
    /* #swagger.security = [{
               "apiKeyAuth": []
        }] */
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
  remove: function (req, res) {
    // #swagger.tags = ['Users']
    // #swagger.description = 'Only Admin can update a user or User can update his account'
    /* #swagger.security = [{
               "apiKeyAuth": []
        }] */
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
