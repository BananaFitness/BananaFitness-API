module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.User, {
          as: 'Friends',
          through: 'Friendships'
        });
      }
    }
  });

  return User;
};