const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const authService = {
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
  // New authentication handler. Private cookie first parameter, public second
  authenticateUser: function(private, public) {
    try {
    let reply = {ok: false, decoded: null, message: "", status: null}; //Sets object to send back. OK tells route if authentication successful, decoded is decoded token, & message + status is for 400 type responses.
    if (!(private && public)) { 
      reply.message = "Login token pair not found";
      reply.status = 401;
      return reply;       
    } 
    reply.decoded = authService.decodeToken(private); 
    if (!(reply.decoded.uuid === public)) {
      reply.message = "Invalid or expired token";
      reply.status = 401;
      return reply;
    } else {
      reply.ok = true;
      return(reply);
    }
    } catch {
      console.error(err);
      return null;
    }
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