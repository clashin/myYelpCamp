const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { descriptors, places } = require('./seedhelpers');
const cities = require('./cities');
const incities = require('./indiancities');

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
    for (let i = 0; i < 350; i++) {  
        const random1000 = Math.floor(Math.random() * 490);
        const price = Math.floor(Math.random() * 20) + 10;
        const index = incities[random1000].location.indexOf(',')
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            // Your User ID
            author: '60437dfd812762182c65ec2c',
            location: `${incities[random1000].name_of_city}, ${incities[random1000].state_name}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    incities[random1000].location.slice(index + 1),
                    incities[random1000].location.slice(0, index)
                ]
            },
            images: [{
                url: "https://res.cloudinary.com/clashin/image/upload/v1615475428/YelpCamp/jvfg82qu9wjatjgldpf0.jpg",
                filename: "YelpCamp/jvfg82qu9wjatjgldpf0"
            },
            {
                url: "https://res.cloudinary.com/clashin/image/upload/v1615457460/YelpCamp/jvxk70g0p1ip9bkmlafh.jpg",
                filename: "YelpCamp/jvxk70g0p1ip9bkmlafh.jpg"
            }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, asperiores nihil. Accusantium perferendis commodinam dolorem labore laboriosam iusto repudiandae minima quas pariatur quos, dolorum itaque soluta quis amet! Explicabo?',
            price
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})