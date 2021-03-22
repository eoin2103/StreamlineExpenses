const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();

//connect to DB
mongoose.connect( process.env.DB_CONNECTION , { useUnifiedTopology: true }, { useNewUrlParser: true }, () => console.log("Connected to db"));

//Import routes
const authroute = require('./routes/authroute');
const claimsroute = require('./routes/claims');

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));

//middleware routes
app.use('/api/user', authroute);
app.use('/api/claims', claimsroute);

app.listen(3000, () => console.log('Server running'));