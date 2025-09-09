// frontend/src/pages/Login.js
import React, { useState } from 'react';
import api from '../utils/api';

export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Logged in!');
      window.location.href = '/'; // redirect to home
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input required placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="mb-3 w-full p-2 border rounded" />
        <input required placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="mb-4 w-full p-2 border rounded" />
        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white p-2 rounded">{loading ? 'Logging...' : 'Login'}</button>
      </form>
    </div>
  );
}
