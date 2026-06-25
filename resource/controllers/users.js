const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createManager = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const manager = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'manager',
      phone: phone ? phone.trim() : undefined,
      status: 'active'
    });

    const savedManager = await manager.save();

    return res.status(201).json({
      _id: savedManager._id,
      name: savedManager.name,
      email: savedManager.email,
      role: savedManager.role,
      phone: savedManager.phone,
      status: savedManager.status,
      profile: savedManager.profile,
      createdAt: savedManager.createdAt,
      updatedAt: savedManager.updatedAt
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Tạo tài khoản manager thất bại.', error: error.message });
  }
};

module.exports = { createManager };
