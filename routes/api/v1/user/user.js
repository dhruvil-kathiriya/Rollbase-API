const express = require('express');

const routes = express.Router();

const Passport = require('passport');

const userController = require('../../../../controller/api/v1/user/userController');

routes.post('/insertUserData', userController.insertUserData);

routes.post('/loginUser', userController.loginUser);

routes.get(
  '/viewUserProfile',
  Passport.authenticate('userLogin', { failureRedirect: '/failLogin' }),
  userController.viewUserProfile
);

routes.put(
  '/editUserProfile',
  Passport.authenticate('userLogin', { failureRedirect: '/failLogin' }),
  userController.editUserProfile
);

routes.delete(
  '/deleteUser',
  Passport.authenticate('userLogin', { failureRedirect: '/failLogin' }),
  userController.deleteUser
);

routes.get('/failLogin', async (req, res) => {
  return res.status(400).json({ msg: 'Invalid username or password', status: 0 });
});

module.exports = routes;
