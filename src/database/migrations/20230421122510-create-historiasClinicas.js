'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HistoriasClinicas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hc: {
        type: Sequelize.STRING(100),
        unique: true
      },
      ultimoRegistro: {
        type: Sequelize.DATE
      },
      personaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Personas'
          },
          key: 'id'
        }
      },
      cajaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          tableName: 'Cajas'
        },
        key: 'id'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HistoriasClinicas');
  }
};