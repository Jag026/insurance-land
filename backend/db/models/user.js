'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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