const router = require("express").Router();
const { transactionController } = require("../controllers");

router.get("/", transactionController.getAllTransaction);
router.post("/", transactionController.addTransaction);


module.exports = router;
