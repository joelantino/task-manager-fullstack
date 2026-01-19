require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/task_db';

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
}

connectDB();

// Basic schema and model test
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', TaskSchema);

async function createTestTask() {
    try {
        const task = new Task({ title: 'Test Task' });
        await task.save();
        console.log('✅ Test task created successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating test task:', error.message);
        process.exit(1);
    }
}

mongoose.connection.once('open', () => {
    createTestTask();
});
