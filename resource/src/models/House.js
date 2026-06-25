const mongoose = require('mongoose');
const { Schema } = mongoose;

const HouseSchema = new Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, trim: true },
  address: { type: String, required: true, trim: true },
  manager: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['active', 'maintenance', 'inactive'], default: 'active' },
  description: { type: String, trim: true },
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }]
}, { timestamps: true });

module.exports = mongoose.model('House', HouseSchema);
