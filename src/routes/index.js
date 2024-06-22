var express = require('express');
var router = express.Router();
const productRoutes = require('./produtoRoutes');

router.get('/', function (req, res, next) {
    res.redirect('/api-docs');
});

router.get('/api', function (req, res, next) {
    res.redirect('/api-docs');
});

module.exports = router;
