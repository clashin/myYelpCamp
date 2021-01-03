const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { descriptors, places } = require('./seedhelpers');
const cities = require('./cities');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => {
    return array[Math.floor(Math.random()*array.length )]
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {  
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: 'https://source.unsplash.com/collection/483251/1200x720',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, asperiores nihil. Accusantium perferendis commodinam dolorem labore laboriosam iusto repudiandae minima quas pariatur quos, dolorum itaque soluta quis amet! Explicabo?',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})