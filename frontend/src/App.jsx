import React, { useState, useEffect } from 'react'
import Auth from './components/Auth'
import TaskList from './components/TaskList'
import './index.css'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Basic check for existing session
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, we'd verify the token or fetch user profile here
      // For now, we'll keep it simple and assume the user is valid if token exists 
      // (Simplified for this exercise)
    }
  }, []);

  return (
    <div className="App">
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <TaskList user={user} setUser={setUser} />
      )}
    </div>
  )
}

export default App
