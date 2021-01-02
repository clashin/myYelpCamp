const express = require('express');

const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/makecamp', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', description: 'No camping allowed' });
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});