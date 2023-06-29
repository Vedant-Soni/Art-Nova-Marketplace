'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class login extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  login.init(
    {
      address: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      nounce: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'login',
    },
  );
  return login;
};
