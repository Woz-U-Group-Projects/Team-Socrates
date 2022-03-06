const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

var authService = {
  // Create jwt & uuid reference
  signInUser: function(user) { 
    const newUuid = uuid.v4();
    const token = jwt.sign(
      {
        username: user.username,
        userId: user.userId,
        admin: user.admin,
        uuid: newUuid,
      },
      'secretkey', // Will need to make secret key process secure later!
      {
        expiresIn: '1h'
      },
    );
    return {token: token, uuid: newUuid};
  },
  // decodes jwt
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
  // Compares decoded jwt to public cookie
  crossReference: function(decoded, public) { // references jwt against public uuid
    return(decoded.uuid === public);
  },
  // encrypts new user password
  hashPassword: function(plainTextPassword) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(plainTextPassword, salt);
    return hash;
  },
  // verifies login password against encrpyted entry
  verifyPassword: function(plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }
  

}

  module.exports = authService; 