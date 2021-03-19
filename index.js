const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//connect to DB
mongoose.connect( process.env.DB_CONNECTION , { useNewUrlParser: true }, { useUnifiedTopology: true }, () => console.log("Connected to db"));

//Import routes
const authroute = require('./routes/authroute');
const claimsroute = require('./routes/claims');

//middleware
app.use(express.json());

//middleware routes
app.use('/api/user', authroute);
app.use('/api/claims', claimsroute);

app.listen(3000, () => console.log('Server running'));