const db = require('../config/dbConfig');

const createCustomer = (customer, callback) => {
    const queryString = "INSERT INTO customer (id, name, phone) VALUES (nextval('customer_id_seq'), $1, $2)";
    db.query(queryString, [customer.name, customer.phone], (error, results) => {
        if (error) throw error;
        callback(results.rows);
    });
};

const findAllCustomers = (callback) => {
    const queryString = "SELECT * FROM customer";
    db.query(queryString, [], (error, results) => {
        if (error) throw error;
        callback(results.rows);
    });
};

const findCustomerById = (id, callback) => {
    const queryString = "SELECT * FROM customer WHERE id = $1";
    db.query(queryString, [id], (error, results) => {
        if (error) throw error;
        callback(results[0]);
    });
};

const updateCustomer = (id, customer, callback) => {
    const queryString = "UPDATE customer SET name = $1, phone = $2 WHERE id = $3";
    db.query(queryString, [customer.name, customer.phone, id], (error, results) => {
        if (error) throw error;
        callback();
    });
};

const deleteCustomer = (id, callback) => {
    const queryString = "DELETE FROM customer WHERE id = $1";
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
