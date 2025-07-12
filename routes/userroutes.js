const express = require('express');
const router = express.Router();
const userService = require('../services/userservices');
const JWT = require('jsonwebtoken');
const AuthWithJWT = require('../middlewares/AuthWithJWT');
//register a new user
router.post('/register', async (req, res) => {
    try {
        const newUserId = await userService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', userId: newUserId });
    } catch (e) {
        res.status(400).json({
            'message': 'Error registering user',
            'error': e
        });
    }
});
//login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        const token = JWT.sign({ 'Id': user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
        res.status(200).json({ message: 'Login successful', token: token });
    } catch (e) {
        res.status(401).json({
            'message': 'Error logging in',
            'error': e
        });
    }
});
//get user by ID
router.get('/rud', AuthWithJWT, async (req, res) => {
    try {
        const user = await userService.getUserById(req.Id);
        res.status(200).json(user);
    } catch (e) {
        res.status(404).json({
            'message': 'Error retrieving user',
            'error': e
        });
    }
});
//update user details
router.put('/rud', AuthWithJWT, async (req, res) => {
    try {
        await userService.updateUser(req.Id, req.body);
        res.status(200).json({ message: 'User updated successfully'});
    } catch (e) {
        res.status(400).json({
            'message': 'Error updating user',
            'error': e
        });
    }
});
//delete user details
router.delete('/rud', AuthWithJWT, async (req, res) => {
    try {
        await userService.deleteUser(req.Id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
        res.status(400).json({
            'message': 'Error deleting user',
            'error': e
        });
    }
});
module.exports = router;