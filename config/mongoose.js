// setup mongoose connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://editor:12345@127.0.0.1/edu_mongoose?authSource=admin')
const db = mongoose.connection;

db.once('open', () => { console.log('Connected to MongoDB') });
db.on('error', (err) => { console.log(err) });