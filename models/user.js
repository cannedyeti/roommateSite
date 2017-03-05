'use strict';
var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Please enter a valid email address."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 20],
          msg: "Sorry, your password must be 6 to 20 characters long."
        }
      }
    },
    bio: DataTypes.TEXT
  }, {
    hooks: {
      beforeCreate: function(createdUser, options, cb){
        var hash = bcrypt.hashSync(createdUser.password, 10);
        createdUser.password = hash; //change the users password to encrypted version
        cb(null, createdUser);
     }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.belongsToMany(models.interest, {through: models.user_interest})
      }
    },
    instanceMethods: {
      isValidPassword: function(passwordTyped) {
        return bcrypt.compareSync(passwordTyped, this.password);
      },
      toJSON: function() {
        var data = this.get();
        delete data.password;
        return data;
      }
    }
  });
  return user;
};