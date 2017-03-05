'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_interest = sequelize.define('user_interest', {
    userId: DataTypes.INTEGER,
    interestId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_interest;
};