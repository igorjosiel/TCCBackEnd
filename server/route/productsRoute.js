const express = require('express');
const router = express.Router();
const products = require('../service/productsService');

const message = "Ocorreu algo inesperado. Ou foi um erro de servidor!";

router.get('/', async function(req, res, next) {
    try {
        const { data, pagination, message, statusCode } = await products.getProducts(req.query);
        
        res.status(statusCode).json({ data, pagination, message });
    }
    catch (err) {
        res.status(500).json({ message });
        next(err);
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        const { data, message, statusCode } = await products.getOneProduct(req.params.id);

        res.status(statusCode).json({ data, message });
    }
    catch (err) {
        res.status(500).json({ message });
        next(err);
    }
});

module.exports = router;