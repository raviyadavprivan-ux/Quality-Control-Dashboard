import React,{useState} from 'react';
import { api } from '../api';

export default function Signup(){
  const [u,setU]=useState(''), [p,setP]=useState(''), [role,setRole]=useState('analyst'), [msg,setMsg] = useState('');
  async function submit(e){
    e.preventDefault();
    try {
      await api.signup(u,p,role);
      setMsg('Account created. Use login to sign in.');
      setU(''); setP('');
    } catch (err){
      setMsg(err.response?.data?.error || 'Error');
    }
  }
  return (
    <form onSubmit={submit} style={{border:'1px solid #eee', padding:20, borderRadius:8, width:360}}>
      <h3>Sign Up</h3>
      <input placeholder="username" value={u} onChange={e=>setU(e.target.value)} required />
      <input placeholder="password" type="password" value={p} onChange={e=>setP(e.target.value)} required />
      <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value="analyst">Analyst</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Create</button>
      {msg && <div>{msg}</div>}
    </form>
  );
}
