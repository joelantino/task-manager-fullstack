import React, { useState } from 'react';
import { login, register } from '../api';
import { LogIn, UserPlus, ShieldCheck } from 'lucide-react';

const Auth = ({ setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = isLogin ? await login(formData) : await register(formData);
            localStorage.setItem('token', data.token);
            setUser(data.user);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="glass-card fade-in" style={{ padding: '3rem', width: '100%', maxWidth: '450px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', marginBottom: '1rem' }}>
                        <ShieldCheck size={32} color="var(--primary)" />
                    </div>
                    <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>{isLogin ? 'Login to manage your tasks' : 'Join us and stay organized'}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <label>Username</label>
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Enter username"
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            className="input-field"
                            type="email"
                            placeholder="name@example.com"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            className="input-field"
                            type="password"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    {error && <p style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</p>}

                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer', marginLeft: '5px' }}
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
