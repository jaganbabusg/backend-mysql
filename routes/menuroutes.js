const express = require('express');
const router = express.Router();
const menuService = require('../services/menuservices');

router.get('/', async (req, res) => {
    const menu = await menuService.getAllMenuItems();
    res.status(200).json(menu);
});
router.get('/:id', async (req, res) => {
    const menuItem = await menuService.getMenuItemById(req.params.id);
    res.status(200).json(menuItem);
});
module.exports = router;
