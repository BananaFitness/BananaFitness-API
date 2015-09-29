module.exports = function(sequelize, DataTypes) {
  var Workout = sequelize.define('Workout', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        Workout.belongsTo(models.User);
      }
    }
  });

  return Workout;
};