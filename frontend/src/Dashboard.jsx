import React, {useState, useEffect} from 'react';
import { api } from '../api';
import ErrorForm from '../components/ErrorForm';
import ErrorTable from '../components/ErrorTable';

export default function Dashboard({ user, onLogout }){
  const [errors, setErrors] = useState([]);
  const [q, setQ] = useState('');

  async function load(qstr=''){
    try {
      const rows = await api.listErrors(qstr);
      setErrors(rows);
    } catch (err) {
      alert('Load failed');
    }
  }

  useEffect(()=> { load(); }, []);

  async function create(payload){
    await api.createError(payload);
    load(q);
  }
  async function deleteOne(id){
    if(!confirm('Delete?')) return;
    await api.deleteError(id);
    load(q);
  }

  return (
    <div style={{padding:20}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div><h2>Welcome {user.username} ({user.role})</h2></div>
        <div>
          <button onClick={()=>{ onLogout(); }}>Logout</button>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <ErrorForm onCreate={create} />
        <div style={{marginTop:12}}>
          <input placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} />
          <button onClick={()=>load(q)}>Search</button>
          <button onClick={()=>{ setQ(''); load(); }}>Clear</button>
        </div>

        <ErrorTable errors={errors} onDelete={deleteOne} />
      </div>
    </div>
  )
}
