
const express = require('express');
const router = express.Router();

module.exports = (AppDataSource) => {
    const { signup, login } = require('../controllers/authController')(AppDataSource);

    router.post('/signup', signup);
    router.post('/login', login);

    return router;
};