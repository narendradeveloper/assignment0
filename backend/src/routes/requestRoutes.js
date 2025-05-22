const express = require('express');
const router = express.Router();

module.exports = (AppDataSource) => {
    const authenticate = require('../middleware/authMiddleware');
    const authorize = require('../middleware/roleMiddleware');
    const { submitRequest, updateRequest } = require('../controllers/requestController')(AppDataSource);

    router.post('/', authenticate, authorize('Employee'), submitRequest);
    router.patch('/:id', authenticate, authorize('Manager'), updateRequest);

    return router;
};

