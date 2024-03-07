const db = require('../config/dbConfig');

const createCustomer = (customer, callback) => {
    const queryString = "INSERT INTO customers (name, phone) VALUES (?, ?)";
    db.query(queryString, [customer.name, customer.phone], (error, results) => {
        if (error) throw error;
        callback(results.insertId);
    });
};

const findAllCustomers = (callback) => {
    const queryString = "SELECT * FROM customers";
    db.query(queryString, [], (error, results) => {
        if (error) throw error;
        callback(results);
    });
};

const findCustomerById = (id, callback) => {
    const queryString = "SELECT * FROM customers WHERE id = ?";
    db.query(queryString, [id], (error, results) => {
        if (error) throw error;
        callback(results[0]);
    });
};

const updateCustomer = (id, customer, callback) => {
    const queryString = "UPDATE customers SET name = ?, phone = ? WHERE id = ?";
    db.query(queryString, [customer.name, customer.phone, id], (error, results) => {
        if (error) throw error;
        callback();
    });
};

const deleteCustomer = (id, callback) => {
    const queryString = "DELETE FROM customers WHERE id = ?";
    db.query(queryString, [id], (error, results) => {
        if (error) throw error;
        callback();
    });
};

module.exports = {
    createCustomer,
    findAllCustomers,
    findCustomerById,
    updateCustomer,
    deleteCustomer
};
