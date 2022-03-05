const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

var authService = {
  signInUser: function(user) {
    const newUuid = uuid.v1();
    const token = jwt.sign(
      {
        username: user.username,
        userId: user.userId,
        uuid: newUuid,
      },
      'secretkey', // Will need to make secret key process secure later!
      {
        expiresIn: '1h'
      },
    );
    return {token: token, uuid: newUuid};
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