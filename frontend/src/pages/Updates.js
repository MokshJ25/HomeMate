// frontend/src/pages/Updates.js
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { connectSocket } from '../utils/socket';

export default function Updates(){
  const [bookings, setBookings] = useState([]);

  useEffect(()=> {
    const load = async () => {
      try {
        const res = await api.get('/bookings/my');
        setBookings(res.data);
      } catch (e) { console.error(e); }
    };
    load();

    const socket = connectSocket();
    // get user id from token via /auth/me
    (async()=>{
      try {
        const userRes = await api.get('/auth/me');
        const userId = userRes.data.id;
        socket.emit('join_user', userId);
      } catch(e){}
    })();

    socket.on('booking_update', (b) => {
      // update if already in list or fetch again
      setBookings(prev => {
        const found = prev.find(x=>String(x._id) === String(b._id));
        if(found) {
          return prev.map(x => x._id === b._id ? b : x);
        } else {
          return [b, ...prev];
        }
      });
    });

    socket.on('booking_assigned', async ({ bookingId }) => {
      try {
        const res = await api.get(`/bookings/${bookingId}`);
        setBookings(prev => [res.data, ...prev.filter(x => x._id !== res.data._id)]);
      } catch {}
    });

    return () => {
      socket.off('booking_update');
      socket.off('booking_assigned');
    };
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Updates</h2>
      <div className="space-y-4">
        {bookings.map(b => (
          <div key={b._id} className="p-4 rounded shadow bg-white">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{b.category} — {b.packageName || b.durationType}</div>
                <div className="text-sm text-gray-600">Status: {b.status}</div>
              </div>
              <div className="text-right text-sm">
                <div>{b.schedule?.length || 0} scheduled days</div>
                <div className="text-gray-500">{new Date(b.createdAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="font-medium">Recent updates</div>
              <ul className="list-disc ml-5 mt-2 text-sm">
                {(b.updates || []).slice().reverse().map((u,i)=>(
                  <li key={i}>{new Date(u.date).toLocaleString()}: {u.message}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {bookings.length === 0 && <div className="text-gray-500">No updates yet.</div>}
      </div>
    </div>
  );
}
