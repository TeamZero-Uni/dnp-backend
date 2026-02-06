const express = require('express');
const { login, register, logout, getMe, refreshToken } = require('../controller/auth-controller');
const router = express.Router();

// @route POST api/v1/auth/login
// @desc Register new user
// @access Public
router.post('/login', login);

// @route POST api/v1/auth/register
// @desc Register new user
// @access Public
router.post('/register', register);

// @route POST api/v1/auth/logout
// @desc Logout user
// @access Public
router.post('/logout', logout);

// @route GET api/v1/auth/me
// @desc Get current user
// @access Private
router.get('/me', getMe);

// @route POST api/v1/auth/refresh
// @desc Refresh token
// @access Public
router.post('/refresh', refreshToken);

module.exports = router;