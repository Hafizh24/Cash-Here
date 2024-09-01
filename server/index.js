const express = require('express')
const PORT = 2000
const db = require('./models')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/public', express.static('./public'))

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/api', (req, res) => {
  res.send('This is my API')
})

const { userRouter, productRouter, categoryRouter, transactionRouter, transactionProductRouter } = require('./routers')

app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/transactions', transactionRouter)
app.use('/products', productRouter)
app.use('/transaction-details', transactionProductRouter)

app.listen(PORT, () => {
  // db.sequelize.sync({ alter: true })
  // db.sequelize.sync({ force: true })
  console.log(`Server running on Port : ${PORT}`)
})
