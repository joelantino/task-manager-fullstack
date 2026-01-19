const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Protect all task routes
router.use(auth);

// Get all tasks for logged in user
router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

// Create task
router.post('/', async (req, res, next) => {
    try {
        const { title, description, priority, category, dueDate } = req.body;
        const newTask = new Task({
            title,
            description,
            priority,
            category,
            dueDate,
            user: req.user.id
        });
        const task = await newTask.save();
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
});

// Update task
router.put('/:id', async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        next(err);
    }
});

// Delete task
router.delete('/:id', async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
