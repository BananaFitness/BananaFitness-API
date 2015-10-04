module.exports = function(sequelize, DataTypes) {
  var Workout = sequelize.define('Workout', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'workout',
    classMethods: {
      associate: function(models) {
        Workout.belongsTo(models.User, {
          foreignKey: 'user_id',
          onDelete: 'cascade'
        });
      }
    }
  });

  return Workout;
};