import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

export default function App(){
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')||'null'));
  useEffect(()=> {
    const token = localStorage.getItem('token');
    if(!token){
      setUser(null);
    }
  }, []);
  function handleLogin(userObj, token){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userObj));
    setUser(userObj);
  }
  function handleLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <div>
      {user ? <Dashboard user={user} onLogout={handleLogout} /> : (
        <div style={{display:'flex', gap:20, padding:30}}>
          <Login onLogin={handleLogin} />
          <Signup />
        </div>
      )}
    </div>
  );
}
