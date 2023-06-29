'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nftdetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nftdetails.init(
    {
      walletAddress: DataTypes.STRING,
      nftOwnerAddress: DataTypes.STRING,
      nftContractAddress: DataTypes.STRING,
      tokenId: DataTypes.NUMERIC,
      network: DataTypes.INTEGER,
      nftJsonData: DataTypes.JSON,
      balance: DataTypes.INTEGER,
      floorPrice: DataTypes.DECIMAL(38, 18),
      listingPrice: DataTypes.DECIMAL(38, 18),
      isListed: DataTypes.BOOLEAN,
      order: DataTypes.JSON,
      totalListed: DataTypes.INTEGER,
      availableForListing: DataTypes.INTEGER,
      isCreated: DataTypes.BOOLEAN,
      totalSupply: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'nftdetails',
    },
  );
  return nftdetails;
};
