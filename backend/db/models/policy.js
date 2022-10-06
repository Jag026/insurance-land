'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Policy extends Model {

   toSafeObject() {
      const { id, name, premium, description, companyName } = this; // context will be the User instance
      return { id, name, premium, description, companyName };
   }

    static async addPolicy({ name, premium, description, companyName}) {
      const policy = await Policy.create({
        name,
        premium,
        description,
        companyName
      });
      return await Policy.findByPk(policy.id);
    }

    static associate(models) {
      // define association here
    }
  };
  
  Policy.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 100],
        }
      },
      premium: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
    }
  );
  return Policy;
};