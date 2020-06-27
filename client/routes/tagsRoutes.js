// requirements
const express = require('express');
const grpcRoutes = require('./grpcRoutes');

// new router
const router = express.Router();

// routes
router.get('/tags', grpcRoutes.listTags);
router.post('/tags', grpcRoutes.addTag);

module.exports = router;