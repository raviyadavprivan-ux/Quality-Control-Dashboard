import React, {useState} from 'react';
import { api } from '../api';

export default function Login({ onLogin }){
  const [u,setU] = useState('');
  const [p,setP] = useState('');
  const [err,setErr] = useState('');
  const [loading,setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.login(u,p);
      localStorage.setItem('token', res.token);
      onLogin(res.user, res.token);
    } catch (e) {
      setErr(e.response?.data?.error || 'Login failed');
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit} style={{border:'1px solid #eee', padding:20, borderRadius:8, width:360}}>
      <h3>Login</h3>
      <input placeholder="username" value={u} onChange={e=>setU(e.target.value)} required />
      <input placeholder="password" type="password" value={p} onChange={e=>setP(e.target.value)} required />
      <button type="submit" disabled={loading}>Login</button>
      {err && <div style={{color:'red'}}>{err}</div>}
    </form>
  );
}
