'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nftOwnerAddress: {
        type: Sequelize.STRING,
      },
      nftContractAddress: {
        type: Sequelize.STRING,
      },
      tokenId: {
        type: Sequelize.INTEGER,
      },
      offerer: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.DECIMAL(38, 18),
      },
      order: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('offers');
  },
};
