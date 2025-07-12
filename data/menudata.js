const pool = require("../dbmain");
//Retrieve menu data
async function getAllMenuItems() {
    const [menu_groups] = await pool.query(`SELECT * FROM menu_groups`);
    const [menu_items] = await pool.query(`SELECT * FROM menu_items`);
    const menu = {
        menu_groups: menu_groups,
        menu_items: menu_items
    };
    return menu;
}
//Retrieve menu items by Item ID
async function getMenuItemById(id) {
    const [rows] = await pool.query(`SELECT * FROM menu_items WHERE id = ?`, [id]);
    return rows[0];
}
module.exports = {
    getAllMenuItems,
    getMenuItemById
};