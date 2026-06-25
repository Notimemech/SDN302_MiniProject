const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'manager', 'renter'], default: 'renter' },
  phone: { type: String, trim: true },
  status: { type: String, enum: ['active', 'inactive', 'blocked'], default: 'active' },
  house: { type: Schema.Types.ObjectId, ref: 'House' },
  managedHouse: { type: Schema.Types.ObjectId, ref: 'House' },
  profile: {
    gender: { type: String, enum: ['male', 'female', 'other'] },
    address: { type: String, trim: true },
    birthday: { type: Date }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
