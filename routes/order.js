const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const Order = require("../models/Order");

const router = require("express").Router();

//Create
router.post("/", verifyTokenAndAuth, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedCart = await newProduct.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:userId", verifyTokenAndAuth, async (req, res) => {
  try {
    const orders = await Orders.find({ userId: req.params.userId });
    res.status(200).json(getCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
