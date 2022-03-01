const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    }
  },
  hashPassword: function(plainTextPassword) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  verifyPassword: function(plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }
  

}

  module.exports = authService; 