var Sequelize = require('sequelize');
// sequelize initialization
var sequelize = new Sequelize('CovalentFitness', 'root');

var User = sequelize.define('User', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  name: { type: Sequelize.STRING(32), allowNull: false },
  password: { type: Sequelize.STRING(140) }
});

var Move = sequelize.define('Move', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  name: { type: Sequelize.STRING(32), allowNull: false },
  category: { type: Sequelize.STRING(32) },
  weight: { type: Sequelize.INTEGER },
  reps: { type: Sequelize.INTEGER },
});

var Workout = sequelize.define('Workout', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  name: { type: Sequelize.STRING(32) },
  userId: { type: Sequelize.INTEGER, allowNull: false},
});


//Establish a connection between product & Category/Category.expiration/Tag/Maker

Move.belongsTo(Workout)
User.hasMany(User, { as: 'Friends', foreignKey: 'FriendId', through: 'friends' })

module.exports = sequelize;
