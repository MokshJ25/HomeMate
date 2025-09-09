import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_BASE.replace('/api',''), { transports: ['websocket'] });
socket.on('connect', () => { console.log('socket connected'); });
// subscribe to booking updates: if you use rooms per user id, join on login
socket.emit('join_user', userId);
socket.on('booking_update', (data) => { /* show update in UI */ });
