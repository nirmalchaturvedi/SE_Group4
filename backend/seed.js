const mongoose = require('mongoose');
const Product = require('./models/Product');

const seedProducts = async () => {
    await mongoose.connect('mongodb://localhost:27017/mehtaEnterprise', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const products = [
        {
            name: 'Ball Bearing',
            category: 'Bearings',
            price: 10.99,
            stock: 100,
            image: 'http://localhost:3000/images/bearing1.jpg',
            offer: true,
        },
        {
            name: 'Roller Bearing',
            category: 'Bearings',
            price: 15.99,
            stock: 50,
            image: 'http://localhost:3000/images/bearing2.jpg',
            offer: false,
        },
        {
            name: 'Thrust Bearing',
            category: 'Bearings',
            price: 20.99,
            stock: 30,
            image: 'http://localhost:3000/images/bearing3.jpg',
            offer: true,
        },
        {
            name: 'Angular Contact Bearing',
            category: 'Bearings',
            price: 25.99,
            stock: 40,
            image: 'http://localhost:3000/images/bearing4.jpg',
        },
        {
            name: 'Cylindrical Roller Bearing',
            category: 'Bearings',
            price: 30.99,
            stock: 25,
            image: 'http://localhost:3000/images/bearing5.jpg',
        },
        {
            name: 'Tapered Roller Bearing',
            category: 'Bearings',
            price: 35.99,
            stock: 20,
            image: 'http://localhost:3000/images/bearing6.jpg',
        },
        {
            name: 'Needle Roller Bearing',
            category: 'Bearings',
            price: 12.99,
            stock: 60,
            image: 'http://localhost:3000/images/bearing7.jpg',
        },
        {
            name: 'Spherical Roller Bearing',
            category: 'Bearings',
            price: 40.99,
            stock: 15,
            image: 'http://localhost:3000/images/bearing8.jpg',
        },
        {
            name: 'Pillow Block Bearing',
            category: 'Bearings',
            price: 18.99,
            stock: 70,
            image: 'http://localhost:3000/images/bearing9.jpg',
        },
        {
            name: 'Linear Bearing',
            category: 'Bearings',
            price: 22.99,
            stock: 35,
            image: 'http://localhost:3000/images/bearing10.jpg',
        },
        {
            name: 'Deep Groove Ball Bearing',
            category: 'Bearings',
            price: 28.99,
            stock: 45,
            image: 'http://localhost:3000/images/bearing11.jpg',
        },
        {
            name: 'Self-Aligning Ball Bearing',
            category: 'Bearings',
            price: 32.99,
            stock: 25,
            image: 'http://localhost:3000/images/bearing12.jpg',
        },
        {
            name: 'Clutch Release Bearing',
            category: 'Bearings',
            price: 19.99,
            stock: 55,
            image: 'http://localhost:3000/images/bearing13.jpg',
        },
        {
            name: 'Cam Follower Bearing',
            category: 'Bearings',
            price: 24.99,
            stock: 30,
            image: 'http://localhost:3000/images/bearing14.jpg',
        },
        {
            name: 'Track Roller Bearing',
            category: 'Bearings',
            price: 29.99,
            stock: 20,
            image: 'http://localhost:3000/images/bearing15.jpg',
        },
        {
            name: 'Insert Bearing',
            category: 'Bearings',
            price: 14.99,
            stock: 80,
            image: 'http://localhost:3000/images/bearing16.jpg',
        },
        {
            name: 'Flange Bearing',
            category: 'Bearings',
            price: 16.99,
            stock: 65,
            image: 'http://localhost:3000/images/bearing17.jpg',
        },
        {
            name: 'Mounted Bearing',
            category: 'Bearings',
            price: 21.99,
            stock: 50,
            image: 'http://localhost:3000/images/bearing18.jpg',
        },
        {
            name: 'Miniature Bearing',
            category: 'Bearings',
            price: 8.99,
            stock: 100,
            image: 'http://localhost:3000/images/bearing19.jpg',
        },
        {
            name: 'Precision Bearing',
            category: 'Bearings',
            price: 50.99,
            stock: 10,
            image: 'http://localhost:3000/images/bearing20.jpg',
        },
    ];

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log('Database seeded with 20 products!');
    mongoose.connection.close();
};

seedProducts();
