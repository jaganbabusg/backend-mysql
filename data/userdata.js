const pool = require('../dbmain');
//Retrieve user data by email
async function getUserByEmail(email) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
}
//Retrieve user data by ID
async function getUserById(id) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    const user = rows[0];
    const [addresses] = await pool.query(`SELECT * FROM user_address WHERE user_id = ?`, [id]);
    user.addresses = addresses;
    return user;
}
//Create a new user
async function createUser(userDetails) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        //Create new user
        const [result] = await connection.query(`INSERT INTO users (first_name, last_name, mobile, email, password) VALUES (?, ?, ?, ?, ?)`,
            [userDetails.first_name, userDetails.last_name, userDetails.mobile, userDetails.email, userDetails.password]);
        //get new user ID
        const userId = result.insertId;
        //add addresses
        if (userDetails.addresses.length > 0) {
            for (const address of userDetails.addresses) {
                await connection.query(`INSERT INTO user_address (user_id, unit_no, address_line_1, address_line_2, postal_code) VALUES (?, ?, ?, ?, ?)`,
                    [userId, address.unit_no, address.address_line_1, address.address_line_2, address.postal_code]);
            }
        }
        //Commit transaction
        await connection.commit();
        return userId;
    } catch (e) {
        connection.rollback();
    } finally {
        connection.release();
    }
}
//Update user data
async function updateUser(id, userDetails) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        //Update user details
        await connection.query(`UPDATE users SET first_name = ?, last_name = ?, mobile = ?, email = ? WHERE id = ?`,
            [userDetails.first_name, userDetails.last_name, userDetails.mobile, userDetails.email, id]);
        //update addresses
        await connection.query(`DELETE FROM user_address WHERE user_id = ?`, [id]);
        if (userDetails.addresses.length > 0) {
            for (const address of userDetails.addresses) {
                await connection.query(`INSERT INTO user_address (user_id, unit_no, address_line_1, address_line_2, postal_code) VALUES (?, ?, ?, ?, ?)`,
                    [id, address.unit_no, address.address_line_1, address.address_line_2, address.postal_code]);
            }
        }
        //Commit transaction
        await connection.commit();
    } catch (e) {
        await connection.rollback();
    } finally {
        connection.release();
    }
}
//Delete user by ID
async function deleteUser(id) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        await connection.query(`DELETE FROM user_address WHERE user_id = ?`, [id]);
        await connection.query(`DELETE FROM users WHERE id = ?`, [id]);
        await connection.commit();
    } catch (e) {
        await connection.rollback();
    } finally {
        connection.release();
    }
}
module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
