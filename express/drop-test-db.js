const authService = require('./services/auth');
const { sequelize } = require('./models');
try {
async function drop(){
  await sequelize.drop();
  console.log('\x1b[41m%s\x1b[0m', 'Let the bodies hit the floor!');  
}

drop();
} catch {
  console.error(err);
}