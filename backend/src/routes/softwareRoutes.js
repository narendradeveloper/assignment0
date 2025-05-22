const express = require('express');
const router = express.Router();

module.exports = (AppDataSource) => {
    const authenticateToken = require('../middleware/authMiddleware');
    const checkRole = require('../middleware/roleMiddleware');
    const softwareController = require('../controllers/softwareController')(AppDataSource);

    router.post('/', authenticateToken, checkRole('Admin'), softwareController.createSoftware);
    router.get('/all', softwareController.getAllSoftware);

    return router;
};


