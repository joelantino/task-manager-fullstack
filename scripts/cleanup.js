require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/task_db';

async function cleanup() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for cleanup');

        const collections = await mongoose.connection.db.listCollections().toArray();

        for (const collection of collections) {
            console.log(`Clearing collection: ${collection.name}`);
            await mongoose.connection.db.dropCollection(collection.name);
        }

        console.log('✅ Database cleared successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Cleanup failed:', error.message);
        process.exit(1);
    }
}

cleanup();
