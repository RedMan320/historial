'use strict';
const {
  Model
} = require('sequelize');
const historiasclinicas = require('./historiasclinicas');
const historiasclinicas = require('./personas');
module.exports = (sequelize, DataTypes) => {
  class Cajas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cajas.init({
    codigoBarras: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cajas',
  });
  return Cajas;
};