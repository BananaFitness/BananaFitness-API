module.exports = function(sequelize, DataTypes) {
  var Move = sequelize.define('Move', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    workout_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING
    },
    weight: {
      type: DataTypes.INTEGER
    },
    reps: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'move',
    classMethods: {
      associate: function(models) {
        Move.belongsTo(models.Workout, {
          foreignKey: 'workout_id',
          onDelete: 'cascade'
        });
      }
    }
  });

  return Move;
};