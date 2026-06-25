const mongoose = require('mongoose');
const { Schema } = mongoose;

const BillSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  renter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['rent', 'electric', 'water', 'service', 'other'], required: true },
  amount: { type: Number, required: true, min: 0 },
  month: { type: String, required: true, trim: true },
  dueDate: { type: Date },
  status: { type: String, enum: ['pending', 'paid', 'overdue', 'cancelled'], default: 'pending' },
  paidAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Bill', BillSchema);
