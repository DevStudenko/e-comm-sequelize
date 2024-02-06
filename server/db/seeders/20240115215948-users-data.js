'use strict';
const users = [
  {
    email: 'testUser@test.com',
    password: 'test123'
  },
  {
    email: 'testUser2@test.com',
    password: 'test321'
  },
  {
    email: 'testUser3@test.com',
    password: 'test123321'
  }
]


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', users);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
