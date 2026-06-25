const express = require('express');
const userRouter = express.Router();
const { createManager, register, login } = require('../controllers/users');
const verifyToken = require('../middlewares/authen');
const authorizeRole = require('../middlewares/authorizeRole');


userRouter.post('/signup',register);
userRouter.post('/login',login);
userRouter.post('/create/manager', verifyToken, authorizeRole('admin'), createManager);

module.exports = userRouter;
