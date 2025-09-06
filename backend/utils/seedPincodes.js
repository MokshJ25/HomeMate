require('dotenv').config();
const mongoose = require('mongoose');
const Pincode = require('../models/Pincode');

const data = [
  { city: 'Delhi', pincodes: ['110001','110002','110003','110004','110005','110006','110007','110008','110009','110010'] },
  { city: 'Mumbai', pincodes: ['400001','400002','400003','400004','400005','400006','400007','400008','400009','400010'] },
  { city: 'Bengaluru', pincodes: ['560001','560002','560003','560004','560005','560006','560007','560008','560009','560010'] },
  { city: 'Chennai', pincodes: ['600001','600002','600003','600004','600005','600006','600007','600008','600009','600010'] },
  { city: 'Kolkata', pincodes: ['700001','700002','700003','700004','700005','700006','700007','700008','700009','700010'] },
  { city: 'Hyderabad', pincodes: ['500001','500002','500003','500004','500005','500006','500007','500008','500009','500010'] },
  { city: 'Pune', pincodes: ['411001','411002','411003','411004','411005'] },
  { city: 'Ahmedabad', pincodes: ['380001','380002','380003','380004','380005'] },
  { city: 'Jaipur', pincodes: ['302001','302002','302003','302004','302005'] },
  { city: 'Lucknow', pincodes: ['226001','226002','226003'] },
  { city: 'Indore', pincodes: ['452001','452002','452003'] },
  { city: 'Bhopal', pincodes: ['462001','462002','462003'] },
  { city: 'Surat', pincodes: ['395001','395002'] },
  { city: 'Nagpur', pincodes: ['440001','440002'] },
  { city: 'Vadodara', pincodes: ['390001','390002'] },
  // add more as needed...
];

(async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Pincode.deleteMany({});
    await Pincode.insertMany(data);
    console.log('Pincodes seeded');
    process.exit(0);
  } catch (err) { console.error(err); process.exit(1); }
})();
