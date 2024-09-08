const UserModel = require('../models/userModel');

const UserController = {
  async createUser(req, res, next) {
    try {
      const newUser = await UserModel.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  // Add more controllers here (e.g., getUserById, updateUser, deleteUser)
};

module.exports = UserController;
