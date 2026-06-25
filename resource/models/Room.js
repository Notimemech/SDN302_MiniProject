const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoomSchema = new Schema({
  house: { type: Schema.Types.ObjectId, ref: 'House', required: true },
  roomNumber: { type: String, required: true, trim: true },
  title: { type: String, trim: true },
  description: { type: String, trim: true },
  floor: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['available', 'occupied', 'maintenance'], default: 'available' },
  currentRenter: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
  equipment: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
  serviceFees: [{ type: Schema.Types.ObjectId, ref: 'ServiceFee' }]
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
