require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Task = require('./models/Task');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/task_db';

async function viewDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('--- 📊 Database Inspector ---');

        const users = await User.find({}, '-password'); // Don't show password hashes
        const tasks = await Task.find({}).populate('user', 'username email');

        console.log('\n👥 USERS:');
        if (users.length === 0) console.log('No users found.');
        users.forEach(u => console.log(`- [${u._id}] ${u.username} (${u.email})`));

        console.log('\n📋 TASKS:');
        if (tasks.length === 0) console.log('No tasks found.');
        tasks.forEach(t => {
            console.log(`- [${t._id}] ${t.title}`);
            console.log(`  Owner: ${t.user ? t.user.username : 'Unknown'}`);
            console.log(`  Status: ${t.completed ? '✅ Completed' : '⏳ Pending'}`);
        });

        console.log('\n--------------------------');
        process.exit(0);
    } catch (err) {
        console.error('Error viewing database:', err.message);
        process.exit(1);
    }
}

viewDatabase();
