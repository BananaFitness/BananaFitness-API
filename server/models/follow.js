module.exports = function(sequelize, DataTypes) {
  var Follow = sequelize.define('Follow', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'follow',
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Follow;
};