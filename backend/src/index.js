const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('reflect-metadata');
const AppDataSource = require('./config/data-Source');

const authRoutes = require('./routes/authRoutes');
const softwareRoutes = require('./routes/softwareRoutes');
const requestRoutes = require('./routes/requestRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log("server is running");

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.use('/api/auth', authRoutes(AppDataSource));
    app.use('/api/software', softwareRoutes(AppDataSource));
    app.use('/api/requests', requestRoutes(AppDataSource));

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => console.error("Error during Data Source initialization:", error));