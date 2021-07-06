var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/ProductController.js');
var multer = require('../utils/multer');

/*
 * GET
 */
router.get('/', ProductController.list);

/*
 * GET
 */
router.get('/:id', ProductController.show);

/*
 * POST
 */
router.post('/', multer.single('image'), ProductController.create);

/*
 * PUT
 */
router.put('/:id', multer.single('image'), ProductController.update);

/*
 * DELETE
 */
router.delete('/:id', ProductController.remove);

module.exports = router;
