const express = require('express');
const router = express.Router();
const students = require('../service/studentsService');

const message = "Ocorreu algo inesperado. Ou foi um erro de servidor!";

router.get('/', async function(req, res, next) {
    try {
        const { data, pagination, message, statusCode } = await students.getStudents(req.query);
        
        res.status(statusCode).json({ data, pagination, message });
    }
    catch (err) {
        res.status(500).json({ message });
        next(err);
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        const { data, message, statusCode } = await students.getOneStudent(req.params.id);

        res.status(statusCode).json({ data, message });
    }
    catch (err) {
        res.status(500).json({ message });
        next(err);
    }
});

router.post('/', async function(req, res, next) {
    try {
        const { message, statusCode } = await students.createStudent(req.body);
        
        res.status(statusCode).json({ message });
    } catch (err) {
        res.status(500).json({ message });
        next(err);
    }
});

router.put('/:id', async function(req, res, next) {
    try {
        const { message, statusCode } = await students.updateStudent(req.params.id, req.body);
        
        res.status(statusCode).json({ message });
    } catch (err) {
        res.status(500).json({ message });
        next(err);
    }
});

router.delete('/:id', async function(req, res, next) {
    try {
        const { message, statusCode } = await students.removeStudent(req.params.id);
        res.status(statusCode).json({ message });
    } catch (err) {
        res.status(500).json({ message });
        next(err);
    }
});

module.exports = router;