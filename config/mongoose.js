// setup mongoose connection
const mongoose = require('mongoose');

// get evirontment state
const env = process.env.NODE_ENV || 'development';

let db = new mongoose.Connection();
switch (env) { 
    case 'development':
        mongoose.connect('mongodb://editor:12345@127.0.0.1/edu_mongoose?authSource=admin')
        db = mongoose.connection
        break
    case 'production':
        mongoose.connect(process.env.MONGODB_ADDON_URI)
        db = mongoose.connection
        break
}

db.once('open', () => { console.log('Connected to MongoDB') });
db.on('error', (err) => { console.log(err) });