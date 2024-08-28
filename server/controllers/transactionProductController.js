const db = require('../models')
const Transaction = db.Transaction
const Product = db.Product
const User = db.User
const TransactionProduct = db.TransactionProducts
const { Op } = require('sequelize')

module.exports = {
  addTransaction: async (req, res) => {
    const { cart, total_price, change, amount } = req.body

    const id = cart.map((item) => item.id)
    const quantity = cart.map((item) => item.quantity)

    try {
      const transaction = await Transaction.create({
        total_price,
        change,
        amount,
        UserId: req.user.id
      })

      const product = await Product.findAll({
        where: { id: id },
        raw: true
      })

      const stock = product.map((item) => item.total_stock)
      const name = product.map((item) => item.name)
      const price = product.map((item) => item.price)

      const newStock = stock.map((value, index) => value - quantity[index])

      const newProduct = id.map((p, i) => ({
        id: p,
        name: name[i],
        price: price[i],
        total_stock: newStock[i]
      }))

      const updateStock = await Product.bulkCreate(newProduct, {
        fields: ['id', 'total_stock', 'name', 'price'],
        updateOnDuplicate: ['total_stock']
      })

      const data = cart.map((item) => ({
        ProductId: item.id,
        quantity: item.quantity,
        TransactionId: transaction.id
      }))

      const result = await TransactionProduct.bulkCreate(data)

      res.status(200).send('success create transaction')
    } catch (error) {
      console.log(error)
      res.status(400).send({ error: error.message })
    }
  },
  getAllTransaction: async (req, res) => {
    try {
      const result = await TransactionProduct.findAll()
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(400).send({ error: error.message })
    }
  },
  transactionDateRange: async (req, res) => {
    try {
      const { startdate, enddate } = req.body

      const result = await TransactionProduct.findAll({
        include: [
          {
            model: Product,
            required: true,
            attributes: ['name']
          },
          {
            model: Transaction,
            required: true,
            include: [
              {
                model: User,
                attributes: ['username']
              }
            ]
          }
        ],
        where: {
          createdAt: {
            [Op.between]: [startdate, enddate]
          }
        }
      })
      res.status(200).send(result)
    } catch (err) {
      console.log(err)
      res.status(400).send({ err: err.message })
    }
  },
  productEachTransaction: async (req, res) => {
    try {
      const result = await Transaction.findAll({
        include: [
          {
            model: TransactionProduct,
            include: [
              {
                model: Product,
                attributes: ['name']
              }
            ]
          }
        ]
      })
      res.status(200).send(result)
    } catch (err) {
      console.log(err)
      res.status(400).send({ err: err.message })
    }
  }
}
