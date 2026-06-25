const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceFeeSchema = new Schema({
  name: { type: String, required: true, trim: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  amount: { type: Number, required: true, min: 0 },
  month: { type: String, trim: true },
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('ServiceFee', ServiceFeeSchema);
