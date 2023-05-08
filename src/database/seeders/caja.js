'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cajas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cajas.belongsTo(models.Historiasclinicas, { 
        foreignKey: 'cajaId' 
      });
    }
  };
  Cajas.init({
    codigoDeBarra: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cajas',
  });
  return Cajas;
};