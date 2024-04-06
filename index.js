const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');



// Port number
const port =2200;

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'files')));


// Connecting database
mongoose.connect('mongodb://localhost:27017/newdb')

// Define schema
const userSchema = new mongoose.Schema({
    name: String,
    gender: String,
    city: String,
    country: String,
    email: String,
    password: String,
});

// Create a model based on the schema
const userModel = mongoose.model('kenita', userSchema); //creating collection


app.post('/sendata', async (req, res) => {
    const name = req.body.fullname;
    const gender = req.body.gender;
    const city = req.body.city;
    const country = req.body.country;
    const email = req.body.email;
    const password = req.body.password;
    
    try {
        // Create a new user document
        const newUser = new userModel({ name, gender, city, country, email, password });
        
        // Save the user document to the database
        await newUser.save();
        
        console.log({ name, gender, city, country, email, password });
        
        // Send a response
        res.status(200).sendFile(path.join(__dirname, 'files', 'dashboard.html'));
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        res.status(500).send('Error saving data to MongoDB');
    }
});

app.get('/here', (req, res) => {
    userModel.find().then((users) => {
        res.json(users);
    })
})


app.get('/getting', (req, res) => {
    res.json({name:'Lalo', age:25, univ:"UESTC"})
})





app.listen(port, () => {
    console.log('listening on port ' + port);
});