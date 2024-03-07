const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clientController');

router.post('/customers', clienteController.createCustomer);
router.get('/customers', clienteController.getAllCustomers);
router.get('/customers/:id', clienteController.getCustomerById);
router.put('/customers/:id', clienteController.updateCustomer);
router.delete('/customers/:id', clienteController.deleteCustomer);

module.exports = router;
