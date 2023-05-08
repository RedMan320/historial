'use strict';
const {
  Model
} = require('sequelize');
const historiasclinicas = require('./cajas');
const historiasclinicas = require('./personas');
module.exports = (sequelize, DataTypes) => {
  class HistoriasClinicas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Personas.hasOne(historiasclinicas, { 
        foreignKey: 'personaId' 
      });
      Cajas.belongsTo(historiasclinicas, { 
        foreignKey: 'cajaId' 
      });
    }
  }
  HistoriasClinicas.init({
    hc: DataTypes.STRING,
    ultimoRegistro: DataTypes.DATE,
    personaId: DataTypes.INTEGER,
    cajaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HistoriasClinicas',
  });
  return HistoriasClinicas;
};