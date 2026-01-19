import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api';
import { Plus, Trash2, CheckCircle, Circle, LogOut, LayoutDashboard, Calendar, Flag, Tag } from 'lucide-react';

const TaskList = ({ user, setUser }) => {
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newPriority, setNewPriority] = useState('Medium');
    const [newCategory, setNewCategory] = useState('General');
    const [newDueDate, setNewDueDate] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const { data } = await fetchTasks();
            setTasks(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        try {
            const { data } = await createTask({
                title: newTitle,
                priority: newPriority,
                category: newCategory,
                dueDate: newDueDate || undefined
            });
            setTasks([data, ...tasks]);
            setNewTitle('');
            setNewPriority('Medium');
            setNewCategory('General');
            setNewDueDate('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggle = async (id, completed) => {
        try {
            const { data } = await updateTask(id, { completed: !completed });
            setTasks(tasks.map(t => t._id === id ? data : t));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return '#ef4444';
            case 'Medium': return '#f59e0b';
            case 'Low': return '#10b981';
            default: return 'var(--text-muted)';
        }
    };

    return (
        <div className="container" style={{ paddingBottom: '5rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <LayoutDashboard size={28} color="var(--primary)" />
                    <h1>Task Hub</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: '600' }}>{user.username}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</p>
                    </div>
                    <button className="btn btn-primary" onClick={logout} style={{ padding: '8px 16px', fontSize: '0.875rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', boxShadow: 'none' }}>
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </header>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={20} color="var(--primary)" /> New Task
                    </h3>
                    <form onSubmit={handleCreate}>
                        <div className="input-group">
                            <input
                                className="input-field"
                                placeholder="What needs to be done?"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                            <div className="input-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Flag size={14} /> Priority</label>
                                <select
                                    className="input-field"
                                    value={newPriority}
                                    onChange={(e) => setNewPriority(e.target.value)}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Tag size={14} /> Category</label>
                                <input
                                    className="input-field"
                                    placeholder="e.g. Work"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> Due Date</label>
                                <input
                                    className="input-field"
                                    type="date"
                                    value={newDueDate}
                                    onChange={(e) => setNewDueDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
                            Add Task
                        </button>
                    </form>
                </div>

                <div className="fade-in">
                    {loading ? (
                        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading tasks...</p>
                    ) : tasks.length === 0 ? (
                        <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <p style={{ fontSize: '1.125rem' }}>Your workspace is clean. Start by adding a task!</p>
                        </div>
                    ) : (
                        tasks.map(task => (
                            <div key={task._id} className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: `4px solid ${getPriorityColor(task.priority)}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1 }}>
                                    <button
                                        onClick={() => handleToggle(task._id, task.completed)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: task.completed ? 'var(--accent)' : 'var(--text-muted)' }}
                                    >
                                        {task.completed ? <CheckCircle size={26} color="var(--accent)" /> : <Circle size={26} />}
                                    </button>
                                    <div>
                                        <span style={{
                                            fontSize: '1.125rem',
                                            fontWeight: '500',
                                            textDecoration: task.completed ? 'line-through' : 'none',
                                            color: task.completed ? 'var(--text-muted)' : 'var(--text-main)',
                                            display: 'block',
                                            marginBottom: '4px'
                                        }}>
                                            {task.title}
                                        </span>
                                        <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                                                <Tag size={12} /> {task.category || 'General'}
                                            </span>
                                            {task.dueDate && (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                                                    <Calendar size={12} /> {new Date(task.dueDate).toLocaleDateString()}
                                                </span>
                                            )}
                                            <span style={{ color: getPriorityColor(task.priority), fontWeight: 'bold' }}>
                                                {(task.priority || 'Medium').toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--danger)'}
                                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskList;
