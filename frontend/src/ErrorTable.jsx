import React from 'react';
import { CSVLink } from 'react-csv';

export default function ErrorTable({ errors, onDelete }){
  const csvData = errors.map(r => ({ id: r.id, employee: r.employee, description: r.description, timestamp: r.timestamp }));
  return (
    <div style={{marginTop:12}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h4>Errors</h4>
        <CSVLink data={csvData} filename={"errors_export.csv"}>Export CSV</CSVLink>
      </div>
      <table style={{width:'100%', borderCollapse:'collapse', marginTop:8}}>
        <thead>
          <tr><th>#</th><th>Employee</th><th>Error</th><th>Timestamp</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {errors.map((r, i) => (
            <tr key={r.id}>
              <td>{i+1}</td>
              <td>{r.employee}</td>
              <td>{r.description}</td>
              <td>{new Date(r.timestamp).toLocaleString()}</td>
              <td><button onClick={() => onDelete(r.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
