var express = require('express');
var router = express.Router();
const productRoutes = require('./produtoRoutes');

router.get('/', function (req, res, next) {
    res.redirect('/api/info');
});

router.get('/api', function (req, res, next) {
    res.redirect('/api/info');
});

router.use('/api/produtos', productRoutes);

router.get('/api/info', function (req, res, next) {
    res.json({
        name: 'BarberShop API',
        version: '1.0.1',
        description: 'API REST for the management of barbershops and their services'
    });
});

module.exports = router;
