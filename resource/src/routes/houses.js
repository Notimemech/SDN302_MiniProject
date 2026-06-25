const express = require('express');
const router = express.Router();
const { getHouses, createHouse, updateHouse, updateHouseStatus, assignManager } = require('../controllers/houses');
const verifyToken = require('../middlewares/authen');
const authorizeRole = require('../middlewares/authorizeRole');

router.get('/', verifyToken, authorizeRole('admin'), getHouses);
router.post('/', verifyToken, authorizeRole('admin'), createHouse);
router.put('/:id', verifyToken, authorizeRole('admin'), updateHouse);
router.patch('/:id/status', verifyToken, authorizeRole('admin'), updateHouseStatus);
router.patch('/:id/assign-manager', verifyToken, authorizeRole('admin'), assignManager);

module.exports = router;
