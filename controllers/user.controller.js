const { User } = require('../models/user.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      users,
    });
  } catch (error) {
    console / log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { user } = req;

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = await User.create({ name, email, password, role });

    res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { user } = req;
    const { name, email } = req.body;

    user.update({ name, email });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await user.update({ status: 'disabled' });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
