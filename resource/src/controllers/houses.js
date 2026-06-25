const House = require('../models/House');
const User = require('../models/User');

const getHouses = async (req, res) => {
  try {
    const houses = await House.find().populate('manager', 'name email role');
    return res.status(200).json(houses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lấy danh sách house thất bại.', error: error.message });
  }
};

const createHouse = async (req, res) => {
  try {
    const { name, code, address, description } = req.body;

    if (!name || !code || !address) {
      return res.status(400).json({ message: 'Name, code và address là bắt buộc.' });
    }

    const existingHouse = await House.findOne({ code: code.trim() });
    if (existingHouse) {
      return res.status(409).json({ message: 'Mã house đã tồn tại.' });
    }

    const house = new House({
      name: name.trim(),
      code: code.trim(),
      address: address.trim(),
      description: description ? description.trim() : undefined
    });

    const savedHouse = await house.save();
    return res.status(201).json(savedHouse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Tạo house mới thất bại.', error: error.message });
  }
};

const updateHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, address, description, manager } = req.body;

    const house = await House.findById(id);
    if (!house) {
      return res.status(404).json({ message: 'House không tồn tại.' });
    }

    if (code && code.trim() !== house.code) {
      const existingHouse = await House.findOne({ code: code.trim() });
      if (existingHouse && existingHouse._id.toString() !== id) {
        return res.status(409).json({ message: 'Mã house đã tồn tại.' });
      }
    }

    house.name = name ? name.trim() : house.name;
    house.code = code ? code.trim() : house.code;
    house.address = address ? address.trim() : house.address;
    house.description = description !== undefined ? description.trim() : house.description;

    if (manager !== undefined) {
      house.manager = manager;
    }

    const updatedHouse = await house.save();
    return res.status(200).json(updatedHouse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Cập nhật house thất bại.', error: error.message });
  }
};

const updateHouseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status là bắt buộc.' });
    }

    const validStatuses = ['active', 'maintenance', 'inactive'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Status phải là một trong: ${validStatuses.join(', ')}` });
    }

    const house = await House.findById(id);
    if (!house) {
      return res.status(404).json({ message: 'House không tồn tại.' });
    }

    house.status = status;
    const updatedHouse = await house.save();
    return res.status(200).json(updatedHouse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Cập nhật status house thất bại.', error: error.message });
  }
};

const assignManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { managerId } = req.body;

    if (!managerId) {
      return res.status(400).json({ message: 'managerId là bắt buộc.' });
    }

    const house = await House.findById(id);
    if (!house) {
      return res.status(404).json({ message: 'House không tồn tại.' });
    }

    const managerUser = await User.findById(managerId);
    if (!managerUser || managerUser.role !== 'manager') {
      return res.status(400).json({ message: 'managerId phải là một user có role manager.' });
    }

    house.manager = managerId;
    const updatedHouse = await house.save();
    return res.status(200).json(updatedHouse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Gán manager cho house thất bại.', error: error.message });
  }
};

module.exports = {
  getHouses,
  createHouse,
  updateHouse,
  updateHouseStatus,
  assignManager
};
