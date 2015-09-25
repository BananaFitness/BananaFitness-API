module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // Inventory.belongsTo(models.Product);
        // Inventory.belongsTo(models.Store);
      }
    }
  });

  return User;
};