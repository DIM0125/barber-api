const customerRepository = require('../repositories/customerRepository');

const createCustomer = (customerData, callback) => {
    customerRepository.createCustomer(customerData, (id) => {
        callback(id);
    });
};

const getAllCustomers = (callback) => {
    customerRepository.findAllCustomers((customers) => {
        callback(customers);
    });
};

const getCustomerById = (id, callback) => {
    customerRepository.findCustomerById(id, (customer) => {
        callback(customer);
    });
};

const updateCustomer = (id, customerData, callback) => {
    customerRepository.updateCustomer(id, customerData, () => {
        callback();
    });
};

const deleteCustomer = (id, callback) => {
    customerRepository.deleteCustomer(id, () => {
        callback();
    });
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
