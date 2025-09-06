require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const maidRoutes = require('./routes/maids');
const pincodeRoutes = require('./routes/pincodes');
const adminRoutes = require('./routes/admin');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || '*' }
});

// make io accessible in req
app.use((req, res, next) => { req.io = io; next(); });

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/maids', maidRoutes);
app.use('/api/pincodes', pincodeRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('MongoDB connected');
  server.listen(PORT, () => console.log(`Server running on ${PORT}`));
})
.catch(err => console.error(err));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('client connected', socket.id);
  socket.on('join_user', (userId) => { socket.join(userId); });
  socket.on('disconnect', () => { console.log('client disconnected', socket.id); });
});
