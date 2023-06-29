'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class offers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  offers.init(
    {
      nftOwnerAddress: DataTypes.STRING,
      nftContractAddress: DataTypes.STRING,
      tokenId: DataTypes.INTEGER,
      offerer: DataTypes.STRING,
      amount: DataTypes.DECIMAL(38, 18),
      order: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'offers',
    },
  );
  return offers;
};
