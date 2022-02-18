const jwt = require('jsonwebtoken');
const models = require('../models/index');

var authService = {
  signInUser: function(user) {
    const token = jwt.sign(
      {
        username: user.username,
        user_id: user.uid
      },
      'secretkey', // Will need to make more secure later!
      {
        expiresIn: '1h'
      }
    );
    return token;
  },
  decodeToken: function(token) {
    try 
    {
      let decoded = jwt.verify(token, 'secretkey');
      return decoded;
    } catch (err) {
      console.error(err.message);
      return null;
    }}
  }


  module.exports = authService; 