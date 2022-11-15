'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    toSafeObject() {
      const { id, username, email, policyIds } = this; // context will be the User instance
      return { id, username, email, policyIds };
        }
    
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassedword.toString());
    }
    
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

     static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
     }
    
    static async signup({ username, email, password, policyIds }) {
      const hashedPassedword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassedword,
        policyIds
      });
      return await User.scope('currentUser').findByPk(user.id);
    }


    static async addPolicy({ num, userId }) {
      const user = await User.scope('currentUser').findByPk(userId);
      const userPolicies = JSON.parse(user.policyIds);
      const parsedNum = parseInt(num)
      userPolicies.push(parsedNum);
      const newUsersPolicies = await userPolicies;
      console.log(newUsersPolicies);
      console.log(JSON.stringify(newUsersPolicies))
      await user.update({policyIds: JSON.stringify(newUsersPolicies)});
    }

    static async deletePolicy({ policyId, userId }) {
      const user = await User.scope('currentUser').findByPk(userId);
      console.log('user' + user);
      const userPolicies = JSON.parse(user.policyIds);
      const parsedId = parseInt(policyId)
      const updatedPolicies = userPolicies.filter(id => id !== parsedId)
      const newUsersPolicies = await updatedPolicies;
      console.log(newUsersPolicies);
      console.log(JSON.stringify(newUsersPolicies))
      await user.update({policyIds: JSON.stringify(newUsersPolicies)});
    }
    
    static associate(models) {
      // define association here
    }
  };
  
  User.init(
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
      policyIds: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassedword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassedword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};