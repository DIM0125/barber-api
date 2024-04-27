var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.redirect('/api/info');
});

router.get('/api', function (req, res, next) {
    res.redirect('/api/info');
});

router.get('/api/info', function (req, res, next) {
    res.json({
        name: 'BarberShop API',
        version: '1.0.1',
        description: 'API REST for the management of barbershops and their services'
    });
});

module.exports = router;
