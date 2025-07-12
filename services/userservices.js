const userData = require('../data/userData');
const bcrypt = require('bcrypt');
// Retrieve user data by ID
async function getUserById(id) {
    const user = await userData.getUserById(id);
    delete user.password; // Remove password from the response
    return user;
}
async function registerUser(userDetails) {
    // Check if the user already exists
    const existingUser = await userData.getUserByEmail(userDetails.email);
    if (existingUser) {
        throw new Error('User already exists with this email');
    }
    // Validate user data
    if (!userDetails.first_name || !userDetails.last_name || !userDetails.date_of_birth || !userDetails.mobile || !userDetails.email || !userDetails.password) {
        throw new Error('Missing required user data');
    }
    // validate password strength
    if (userDetails.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    userDetails.password = hashedPassword;
    // Create the user
    const newUserId = await userData.createUser(userDetails);
    // Return the new user ID
    return newUserId;
}
async function loginUser(email, password) {
    // Retrieve user by email
    const user = await userData.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    // Remove password from the response
    delete user.password;
    return user;
}
async function updateUser(id, userDetails) {
    // Validate user data
    if (!userDetails.first_name || !userDetails.last_name || !userDetails.date_of_birth || !userDetails.mobile || !userDetails.email) {
        throw new Error('Missing required user data');
    }
    // Update the user
    return await userData.updateUser(id, userDetails);
}
async function deleteUser(id) {
    // Check if the user exists
    const user = await userData.getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    // Delete the user
    return await userData.deleteUser(id);
}
module.exports = {
    getUserById,
    registerUser,
    loginUser,
    updateUser,
    deleteUser
};