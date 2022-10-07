'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {

   toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
        }
    
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassedword.toString());
    }
    
    static getCurrentCompanyById(id) {
      return Company.scope("currentCompany").findByPk(id);
    }

     static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const company = await Company.scope('loginCompany').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (company && company.validatePassword(password)) {
        return await Company.scope('currentCompany').findByPk(company.id);
      }
     }
    
    static async signup({ username, email, password }) {
      const hashedPassedword = bcrypt.hashSync(password);
      const company = await Company.create({
        username,
        email,
        hashedPassedword
      });
      return await Company.scope('currentCompany').findByPk(company.id);
    }

    static associate(models) {
      // define association here
    }
  };
  
  Company.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassedword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      ownedPolicies: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
        {
      sequelize,
      modelName: "Company",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassedword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentCompany: {
          attributes: { exclude: ["hashedPassedword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return Company;
};