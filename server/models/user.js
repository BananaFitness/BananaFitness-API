var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

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
    },
    name: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    location: {
      type: DataTypes.STRING
    }
  }, {  
    tableName:'user',
    hooks: {
    afterCreate: function (instance, options) {
      instance.hashPassword();
      }
    },
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Workout, {
          foreignKey:'user_id'
        });
        User.hasMany(models.Follow, {
          foreignKey: 'user_id'
        });
        User.hasMany(models.Follow, {
          foreignKey: 'followee_id'
        });
      }
    },
    instanceMethods: {
      comparePassword: function(attemptedPassword, callback) {
        bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
          callback(isMatch);
        });
      },
      hashPassword: function(){
        var cipher = Promise.promisify(bcrypt.hash);
        return cipher(this.get('password'), null, null).bind(this)
          .then(function(hash) {
            this.set('password', hash);
            this.save();
        });
      }
    }
  });

  return User;
};
