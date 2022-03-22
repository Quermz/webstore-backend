const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const Product = require("../models/Cart");

const router = require("express").Router();

//Create
router.post("/", verifyTokenAndAuth, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get
router.get("/:userId", verifyTokenAndAuth, async (req, res) => {
  try {
    const getCart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(getCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
