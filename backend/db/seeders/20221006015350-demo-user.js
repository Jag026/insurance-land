'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassedword: bcrypt.hashSync('password'),
        policyIds: '12345'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassedword: bcrypt.hashSync('password2'),
        policyIds: '6789'

      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1'] }
    }, {});
  }
};