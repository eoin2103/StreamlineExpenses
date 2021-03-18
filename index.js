const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//connect to DB
mongoose.connect( process.env.DB_CONNECTION , { useNewUrlParser: true }, { useUnifiedTopology: true }, () => console.log("Connected to db"));

//Import routes
const authrouter = require('./routes/authroute');

//middleware
app.use(express.json());

//middleware routes
app.use('/api/user', authrouter);

app.listen(3000, () => console.log('Server running'));