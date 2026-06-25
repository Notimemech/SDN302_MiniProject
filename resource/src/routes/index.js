const express = require('express');
const userRouter = require('./users');
const houseRouter = require('./houses');

const router = express.Router();

router.use('/users', userRouter);
router.use('/houses', houseRouter);

module.exports = router;