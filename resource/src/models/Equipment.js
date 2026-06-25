const mongoose = require('mongoose');
const { Schema } = mongoose;

const EquipmentSchema = new Schema({
  name: { type: String, required: true, trim: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  quantity: { type: Number, default: 1, min: 0 },
  status: { type: String, enum: ['available', 'broken', 'maintenance'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Equipment', EquipmentSchema);
