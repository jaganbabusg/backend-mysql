const menuData = require('../data/menudata');
async function getAllMenuItems(){
    return await menuData.getAllMenuItems();
}
async function getMenuItemById(id){
    return await menuData.getMenuItemById(id);
}
module.exports = {
    getAllMenuItems,
    getMenuItemById
};