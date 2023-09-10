const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64fab54d2121f40ccbcbf53f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
              {
                url: 'https://res.cloudinary.com/djkqa3sft/image/upload/v1694299960/YelpCamp/zhjsgo0j1phtdqgpskql.jpg',
                filename: 'YelpCamp/zhjsgo0j1phtdqgpskql',
              },
              {
                url: 'https://res.cloudinary.com/djkqa3sft/image/upload/v1694299961/YelpCamp/epdtqfdujdaymhpaq9gq.jpg',
                filename: 'YelpCamp/epdtqfdujdaymhpaq9gq',
              },
              {
                url: 'https://res.cloudinary.com/djkqa3sft/image/upload/v1694299961/YelpCamp/bcikdx8pgarcefildlvx.jpg',
                filename: 'YelpCamp/bcikdx8pgarcefildlvx',
              }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita distinctio quo nostrum consequuntur beatae ab voluptates a ratione dolorum. Nobis rem ad quia id dolorem nihil, dolorum odit vitae veniam.',
            price,
            geometry: { 
              type: 'Point', 
              coordinates: [
                cities[random1000].longitude, 
                cities[random1000].latitude
              ] 
            },
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})