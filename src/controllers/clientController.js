const customerService = require('../services/customerService');

const createCustomer = (req, res) => {
    customerService.createCustomer(req.body, (id) => {
        res.status(201).send({ id });
    });
};

const getAllCustomers = (req, res) => {
    customerService.getAllCustomers((customers) => {
        res.json(customers);
    });
};

const getCustomerById = (req, res) => {
    const { id } = req.params;
    customerService.getCustomerById(id, (customer) => {
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).send('Customer not found');
        }
    });
};

const updateCustomer = (req, res) => {
    const { id } = req.params;
    customerService.updateCustomer(id, req.body, () => {
        res.status(200).send('Customer updated');
    });
};

const deleteCustomer = (req, res) => {
    const { id } = req.params;
    customerService.deleteCustomer(id, () => {
        res.status(200).send('Customer deleted');
    });
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
