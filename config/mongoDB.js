const { MongoClient } = require("mongodb");

// get evirontment state
const env = process.env.NODE_ENV || 'development';

// connect to database
const url = () => {
    switch (env) {
        case 'development':
            return 'mongodb://editor:12345@127.0.0.1/edu_mongoose?authSource=admin'
        case 'production':
            return process.env.MONGODB_ADDON_URI
    }
}
const client = new MongoClient(url(), { useNewUrlParser: true });
client.connect(err => {
    if (err) {
        console.log(err);
    } else console.log('Connected to MongoDB');
})

const db = client.db();

module.exports = db;