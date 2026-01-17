const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    brand: {
        type: String,
        require: [true, 'Car brand is required']
    },
    model: {
        type: String,
        require: [true, 'Car model is required']

    },
    year: {
        type: Number,
        require: [true, 'year is required']
    },
    pricePerDay: {
        type: Number,
        required: [true, 'Price per day is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    images: {
        type: [String],

    },
    carType: {
        type: String,
    },
    engine: {
        type: String,
    },
    transmission: {
        type: String,
    },

    condition: {
        type: String,
    },
    mileage: {
        type: Number,
    },
    fueltype: {
        type: String,
    },
    countryoforigin: {
        type: String,
    },
    doors: {
        type: Number,
    },
    seats: {
        type: Number,
    },
    pasenger: {
        type: Number,
    },
    location: {
        type: String,

    },
    description: {
        type: String,

    },
    phone: {
        type: String,
    },

    features: {
        airCondition: { type: Boolean, default: false },
        musicSystem: { type: Boolean, default: false },
        toolkit: { type: Boolean, default: false },
        absSystem: { type: Boolean, default: false },
        bluetooth: { type: Boolean, default: false },
        fullBootSpace: { type: Boolean, default: false },
        usbCharger: { type: Boolean, default: false },
        auxInput: { type: Boolean, default: false },
        spareTyre: { type: Boolean, default: false },
        powerSteering: { type: Boolean, default: false },
        powerWindows: { type: Boolean, default: false }
    }
})

const Car = mongoose.model('Car', carSchema, 'cars')
module.exports = Car