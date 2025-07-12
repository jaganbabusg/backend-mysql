const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
//register routes
const userRoutes = require('./routes/userroutes');
const menuRoutes = require('./routes/menuroutes');
app.use('/api/user', userRoutes);
app.use('/api/menu', menuRoutes);
//start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});