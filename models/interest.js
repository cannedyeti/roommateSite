'use strict';
module.exports = function(sequelize, DataTypes) {
  var interest = sequelize.define('interest', {
    interest: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.interest.belongsToMany(models.user, {through: models.user_interest})
      }
    }
  });
  return interest;
};