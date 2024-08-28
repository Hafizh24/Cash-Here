const { Op, where } = require('sequelize')
const db = require('../models')
const Product = db.Product

module.exports = {
  addProduct: async (req, res) => {
    try {
      const { name, price, total_stock, description, category } = req.body
      console.log(req.body)

      //check if product already exist
      const findProduct = await Product.findOne({
        where: {
          name: name
        }
      })

      //if product isn't already exist
      if (findProduct == null) {
        await Product.create({
          name: name,
          price: price,
          total_stock: total_stock,
          description: description,
          image: req.file?.path,
          CategoryId: category,
          isDeleted: false
        })
      } else {
        return res.status(400).send({ message: 'Product already exist' })
      }
      res.status(200).send({ message: 'Register Success' })
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  },
  getProduct: async (req, res) => {
    try {
      const dataProduct = await Product.findAll({
        where: { isDeleted: 0 }
      })
      res.status(200).send({ dataProduct })
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  },
  getProductByFilter: async (req, res) => {
    try {
      const { name, category, sort_alphabetical, sort_price } = req.query
      const whereCondition = {}
      let order = []

      if (name) {
        whereCondition.name = {
          [Op.like]: `%${name}%`
        }
      }
      if (category) {
        whereCondition.CategoryId = category
      }
      if (sort_alphabetical) {
        order = [['name', `${sort_alphabetical}`]]
      }
      if (sort_price) {
        order = [['price', `${sort_price}`]]
      }

      const dataProduct = await Product.findAll({
        where: whereCondition,
        order: order
      })
      res.status(200).send({ dataProduct })
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  },
  updateProduct: async (req, res) => {
    const { id, name, price, CategoryId, description, total_stock, isActive } = req.body

    console.log(req.body)

    const updateFields = {
      ...(name && { name }),
      ...(price && { price }),
      ...(CategoryId && { CategoryId }),
      ...(description && { description }),
      ...(total_stock && { total_stock })
    }
    if (req.file) {
      updateFields.image = req.file?.path
    }
    if (isActive === 'true') {
      updateFields.isActive = true
    } else {
      updateFields.isActive = false
    }

    try {
      await Product.update(updateFields, { where: { id: id } })
      res.status(200).send({ message: 'Product updated' })
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  },
  deleteProduct: async (req, res) => {
    const { id } = req.body
    try {
      await Product.update(
        {
          isDeleted: true
        },
        {
          where: {
            id: id
          }
        }
      )
      res.status(200).send({ message: 'Account successfully deleted' })
    } catch (error) {
      console.log('This is the error', error)
      res.status(400).send({ error: error.message })
    }
  }
}
