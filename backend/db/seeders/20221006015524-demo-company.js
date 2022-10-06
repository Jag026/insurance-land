'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Companies', [
      {
        email: 'fakecompany55@user.io',
        username: 'fakecompany55',
        hashedPassedword: bcrypt.hashSync('password2'),
        ownedPolicies: '55'
      },
      {
        email: 'fakecompany1@user.io',
        username: 'fakecompany1',
        hashedPassedword: bcrypt.hashSync('password2'),
        ownedPolicies: '12'

      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Companies', {
      username: { [Op.in]: ['fakecompany55', 'fakecompany1'] }
    }, {});
  }
};