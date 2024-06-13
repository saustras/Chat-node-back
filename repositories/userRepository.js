const UserModel = require('../models/UserModel');

const findUserByUsername = async (user) => {
  return await UserModel.findOne({ user });
};

const findUserById = async (id) => {
  return await UserModel.findOne({ _id: id }).select('-password');
};

const UpdateUserById = async (id, name, profile_pic) => {
  return await UserModel.updateOne({ _id: id }, { name, profile_pic });
};

const createUser = async (user) => {
  const newUser = new UserModel(user);
  return await newUser.save();
};

module.exports = {
  findUserByUsername,
  createUser,
  findUserById,
  UpdateUserById
};