import React, {useState} from 'react';

export default function ErrorForm({ onCreate }){
  const [employee, setEmployee] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState('');

  async function submit(e){
    e.preventDefault();
    const payload = {
      employee,
      description: desc,
      timestamp: time || new Date().toISOString()
    };
    await onCreate(payload);
    setEmployee(''); setDesc(''); setTime('');
  }

  return (
    <form onSubmit={submit} style={{border:'1px solid #ddd', padding:12, borderRadius:8}}>
      <div>
        <input placeholder="Employee name" value={employee} onChange={e=>setEmployee(e.target.value)} required />
      </div>
      <div>
        <textarea placeholder="Error description" value={desc} onChange={e=>setDesc(e.target.value)} required />
      </div>
      <div>
        <input type="datetime-local" value={time} onChange={e=>setTime(e.target.value)} />
      </div>
      <button type="submit">Add Error</button>
    </form>
  )
}
