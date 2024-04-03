'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('users',
   [
    {
    firsname:"julianto",
    lastname:"supriyadi",
    email:"admin@gmail.com",
    password:"123",
    role:"admin",
    // createAt: now,
    // updateAt:now
   },
    {
    firsname:"mas anies",
    lastname:"cak imin",
    email:"usersa@gmail.com",
    password:"123",
    role:"user",
    // createAt: now,
    // updateAt:now
   },
    {
    firsname:"prabowo",
    lastname:"gibran",
    email:"users2@gmail.com",
    password:"123",
    role:"user",
    // createAt: now,
    // updateAt:now
   }
  
  ]
   )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users',null, {})
  }
};
