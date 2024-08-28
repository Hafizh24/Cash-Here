const router = require("express").Router();
const { categoryController } = require("../controllers");

router.get("/", categoryController.getAllCategory);
router.post("/", categoryController.addCategory);
router.patch("/:id", categoryController.updateCategory);
router.patch("/delete/:id", categoryController.deleteCategory);

module.exports = router;
