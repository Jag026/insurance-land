'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Policies', [
      {
        name: 'First Policy',
        premium: 100,
        description: 'The greatest policy ever',
        companyName: 'Baggins INC'
      },
      {
        name: 'Second Policy',
        premium: 233,
        description: 'The 2nd greatest policy ever',
        companyName: 'Shelfied INC'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Policies', {
      name: { [Op.in]: ['First Policy', 'Second Policy'] }
    }, {});
  }
};