import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: 'Bearer ' + token } : {};
}

export const api = {
  login: (u,p) => axios.post(`${BASE}/api/auth/login`, { username: u, password: p }).then(r=>r.data),
  signup: (u,p,role) => axios.post(`${BASE}/api/auth/signup`, { username: u, password: p, role }).then(r=>r.data),
  listErrors: (q='') => axios.get(`${BASE}/api/errors${q?('?q='+encodeURIComponent(q)):''}`, { headers: authHeader() }).then(r=>r.data),
  createError: (payload) => axios.post(`${BASE}/api/errors`, payload, { headers: authHeader() }).then(r=>r.data),
  deleteError: (id) => axios.delete(`${BASE}/api/errors/${id}`, { headers: authHeader() }).then(r=>r.data),
};
