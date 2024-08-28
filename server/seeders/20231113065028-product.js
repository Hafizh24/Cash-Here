'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'americano',
        price: 15000,
        total_stock: 10,
        description: 'An invigorating classic, the Americano delivers a bold and robust flavor.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'caffe latte',
        price: 25000,
        total_stock: 5,
        description: ' Indulge in the creamy delight of a Caffe Latte, where the smoothness of steamed milk beautifully harmonizes with the intensity of espresso.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'cappucino',
        price: 25000,
        total_stock: 20,
        description: 'Experience the artistry of a Cappuccino, meticulously crafted with equal parts espresso, steamed milk, and frothy milk foam.',

        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'lemon tea',
        price: 18000,
        total_stock: 20,
        description: 'A refreshing twist on traditional tea, Lemon Tea combines the soothing warmth of tea leaves with the zesty tang of fresh lemon.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'jasmine tea',
        price: 16000,
        total_stock: 20,
        description: 'Embrace the delicate aroma and floral notes of Jasmine Tea.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  }
}
