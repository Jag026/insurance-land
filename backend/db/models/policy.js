'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Policy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Policy.init({
    name: DataTypes.STRING,
    premium: DataTypes.INTEGER,
    description: DataTypes.STRING,
    companyName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Policy',
  });
  return Policy;
};