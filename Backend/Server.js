const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

//initiating the express app
const app = express();

//Fetching variables from environment variable file
const port = process.env.PORT || 5000;
const dburi = process.env.ATLUS_URI;

//initiating connection with mongo db
mongoose.connect(dburi, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("Mongo database connection established successfully.");
})

//Setting up routers
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

//Initiating the app
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);
app.use(cors());
app.use(express.json());
app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});