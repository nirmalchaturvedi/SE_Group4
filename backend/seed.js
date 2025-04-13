const mongoose = require('mongoose');
const Product = require('./models/Product');
const Grease = require('./models/Grease');
const Block = require('./models/Block');

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
            image: 'http://localhost:5000/image/bearing1.jpg',
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

    const grease = [
        {
            name: 'High Temp Grease',
            category: 'Grease',
            price: 12.99,
            stock: 40,
            image: 'http://localhost:3000/images/grease1.jpg',
            offer: true,
        },
        {
            name: 'Multipurpose Grease',
            category: 'Grease',
            price: 9.99,
            stock: 60,
            image: 'http://localhost:3000/images/grease2.jpg',
        },
        {
            name: 'Lithium Grease',
            category: 'Grease',
            price: 11.49,
            stock: 30,
            image: 'http://localhost:3000/images/grease3.jpg',
        }
    ];

    const blocks = [
        {
            name: 'UCP205 Pillow Block',
            category: 'Blocks',
            price: 14.99,
            stock: 25,
            image: 'http://localhost:3000/images/block1.jpg',
        },
        {
            name: 'UCFL204 Flange Block',
            category: 'Blocks',
            price: 16.99,
            stock: 30,
            image: 'http://localhost:3000/images/block2.jpg',
            offer: true,
        },
        {
            name: 'UCF205 Square Block',
            category: 'Blocks',
            price: 18.49,
            stock: 20,
            image: 'http://localhost:3000/images/block3.jpg',
        }
    ];

    await Product.deleteMany({});
    await Grease.deleteMany({});
    await Block.deleteMany({});

    await Product.insertMany(products);
    await Grease.insertMany(grease);
    await Block.insertMany(blocks);

    console.log('Database seeded with Products, Grease, and Blocks!');
    mongoose.connection.close();
};

seedProducts();
