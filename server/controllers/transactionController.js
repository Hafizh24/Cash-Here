const db = require("../models");
const Transaction = db.Transaction;
const Product = db.Product;

module.exports = {
  addTransaction: async (req, res) => {
    const { total_price, name, price, quantity } = req.body;
    try {
      const result = await Transaction.create(
        {
          total_price: total_price,
          UserId: 1,
          Products: [
            {
              name: name,
              price: price,
              TransactionProducts: {
                quantity: quantity,
              },
            },
          ],
        },
        {
          include: [
            {
              model: Product,
            },
          ],
        }
      );
      res.status(200).send({ message: "success create transaction", data: result });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
  getAllTransaction: async (req, res) => {
    try {
      const result = await Transaction.findAll({
        include: [
          {
            model: Product,
          },
        ],
      });
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  },
};
