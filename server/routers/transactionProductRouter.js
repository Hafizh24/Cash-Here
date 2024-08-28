const router = require("express").Router();
const { transactionProductController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

router.get("/", transactionProductController.getAllTransaction);
router.post("/", verifyToken, transactionProductController.addTransaction);
router.post("/date-range", verifyToken, transactionProductController.transactionDateRange);
router.get("/product-transaction", verifyToken, transactionProductController.productEachTransaction);

module.exports = router;
