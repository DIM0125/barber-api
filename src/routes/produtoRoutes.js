const express = require('express');
const router = express.Router();
const productController = require('../controllers/produtoController');
const {authenticateToken} = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, productController.createProduct);
router.get('/', authenticateToken, productController.getAllProducts);
router.get('/:id', authenticateToken, productController.getProductById);
router.put('/:id', authenticateToken, productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

module.exports = router;
