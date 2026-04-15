const express = require('express');
const { getDatasets } = require('../controllers/dataset.controller');

const router = express.Router();
router.get('/', getDatasets);

module.exports = router;
