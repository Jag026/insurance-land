'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {

   toSafeObject() {
      const { id, username, email, ownedPolicies } = this; // context will be the User instance
      return { id, username, email, ownedPolicies };
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
    
    static async signup({ username, email, password, ownedPolicies }) {
      const hashedPassedword = bcrypt.hashSync(password);
      const company = await Company.create({
        username,
        email,
        hashedPassedword,
        ownedPolicies
      });
      return await Company.scope('currentCompany').findByPk(company.id);
    }

    static async addPolicy({ num, companyId }) {
      const company = await Company.scope('currentCompany').findByPk(companyId);
      const companyPolicies = JSON.parse(company.ownedPolicies);
      const parsedNum = parseInt(num)
      companyPolicies.push(parsedNum);
      const newCompanyPolicies = await companyPolicies;
      await company.update({ownedPolicies: JSON.stringify(newCompanyPolicies)});
    }

    static async deletePolicy({ policyId, companyId }) {
      console.log('Delete policy for company: ' + companyId);
      const company = await Company.scope('currentCompany').findByPk(companyId);
      const companyPolicies = await JSON.parse(company.ownedPolicies);
      const parsedPolicyId = parseInt(policyId)
      const newCompanyPolicies = await companyPolicies.filter(id => id !== parsedPolicyId);
      await company.update({ ownedPolicies: JSON.stringify(newCompanyPolicies) });
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
        loginCompany: {
          attributes: {}
        }
      }
    }
  );
  return Company;
};