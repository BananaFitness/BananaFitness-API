module.exports = function(sequelize, DataTypes) {
  var Workout = sequelize.define('Workout', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
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

  return Workout;
};