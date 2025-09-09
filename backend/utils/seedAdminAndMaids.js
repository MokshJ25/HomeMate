// backend/utils/seedAdminAndMaids.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Maid = require('../models/Maid');

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // create admin
    const adminEmail = 'admin@homemate.local';
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('Admin@123', salt);
      const admin = new User({ name: 'HomeMate Admin', email: adminEmail, phone: '9999999999', password, role: 'admin' });
      await admin.save();
      console.log('Admin created: email admin@homemate.local password Admin@123');
    } else {
      console.log('Admin already exists');
    }

    // sample maids
    const sample = [
      { name: 'Sita Devi', gender: 'female', skills: ['cleaning','cooking'], phone: '9000000001' },
      { name: 'Radha Sharma', gender: 'female', skills: ['babysitting','cleaning'], phone: '9000000002' },
      { name: 'Kamal', gender: 'male', skills: ['elderlyCare','cleaning'], phone: '9000000003' }
    ];

    for (const s of sample) {
      const exists = await Maid.findOne({ phone: s.phone });
      if (!exists) {
        const m = new Maid(s);
        await m.save();
        console.log('Created maid:', m.name);
      }
    }

    process.exit(0);
  } catch (e) { console.error(e); process.exit(1); }
};

run();
