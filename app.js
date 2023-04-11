const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/CTCarPool';
const signUpRouter = require('./Routes/signUpDetails');
app.use(express.json());
app.use('/signup', signUpRouter);

mongoose.connect(url);
const con = mongoose.connection;

con.on('open', () => {
    console.log('connected..');
});

app.listen(7000, () => {
    console.log('server started..');
})