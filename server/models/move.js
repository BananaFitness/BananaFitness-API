module.exports = function(sequelize, DataTypes) {
  var Move = sequelize.define('Move', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
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
    classMethods: {
      associate: function(models) {
        Move.belongsTo(models.Workout);
      }
    }
  });

  return Move;
};