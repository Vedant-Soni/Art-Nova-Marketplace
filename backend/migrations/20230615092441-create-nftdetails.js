'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nftdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      walletAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nftOwnerAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nftContractAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tokenId: {
        type: Sequelize.NUMERIC,
        allowNull: false,
      },
      network: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nftJsonData: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      floorPrice: {
        type: Sequelize.DECIMAL(38, 18),
      },
      listingPrice: {
        type: Sequelize.DECIMAL(38, 18),
      },
      isListed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      order: {
        type: Sequelize.JSON,
      },
      totalListed: {
        type: Sequelize.INTEGER,
      },
      availableForListing: {
        type: Sequelize.INTEGER,
      },
      isCreated: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nftdetails');
  },
};
