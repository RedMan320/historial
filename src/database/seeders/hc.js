'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Historiasclinicas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Historiasclinicas.init({
    personaId: DataTypes.INTEGER,
    ultimoRegistro: DataTypes.DATE,
    cajaId: DataTypes.INTEGER,
    hc: DataTypes.STRING,
    vigente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Historiasclinicas',
  });
  return Historiasclinicas;
};