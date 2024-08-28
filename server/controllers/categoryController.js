const db = require('../models')
const Category = db.Category

module.exports = {
  getAllCategory: async (req, res) => {
    try {
      const result = await Category.findAll({
        where: { isDeleted: 0 }
      })
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(400).send({ error: error.message })
    }
  },
  addCategory: async (req, res) => {
    const { name } = req.body
    try {
      const exist = await Category.findOne({
        where: { name }
      })
      if (exist) {
        return res.status(422).send('category already exist')
      }

      const result = await Category.create({ name })

      res.status(201).send({ message: 'category added successfully', data: result })
    } catch (error) {
      console.log(error)
      res.status(400).send({ error: error.message })
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.update({ isDeleted: 1 }, { where: { id: req.params.id } })
      res.status(200).send('category deleted successfully')
    } catch (error) {
      console.log(error)
      res.status(400).send({ error: error.message })
    }
  },
  updateCategory: async (req, res) => {
    try {
      const result = await Category.update({ name: req.body.name }, { where: { id: req.params.id } })

      res.status(200).send('sucsess  category updated successfully')
    } catch (error) {
      console.log(error)
      res.status(400).send({ error: error.message })
    }
  }
}
