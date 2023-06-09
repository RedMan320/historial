'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoriasClinicas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HistoriasClinicas.belongsTo(models.Personas, {as: 'persona'})
      HistoriasClinicas.belongsTo(models.Cajas, {as: 'caja'})
      /* models.Personas.belongsTo(HistoriasClinicas);
      models.Cajas.belongsTo(HistoriasClinicas); */
    }
  }
  HistoriasClinicas.init({
    hc: DataTypes.STRING,
    ultimoRegistro: DataTypes.DATE,
    personaId: DataTypes.INTEGER,
    cajaId: DataTypes.INTEGER,
    vigente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HistoriasClinicas',
  });
  return HistoriasClinicas;
};