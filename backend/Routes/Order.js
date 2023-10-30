const express = require("express");
const auth = require("../Middleware/auth");
const router = express.Router();
const Order = require("../Model/Order");

router.post("/create/order", auth, async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
  try {
  console.log(req.body)

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
// const orderSave = await order.save()
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
});
//  ===============GET ALL ORDERS==============
router.get("/get/orders", auth, async(req,res) => {
    try {
        const orders = await Order.find({ user: req.user._id });

        res.status(200).json(orders);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: "Internal server error" });
    }
})

// ======================GET SINGLE ORDER===================
router.get("/order/:id", auth, async(req,res) => {
  try {
    const {id} = req.params
    const order = await Order.findById(id).populate(
      "user",
      "name email"
    );
  
    if (!order) {
      return next(new ErrorHander("Order not found with this Id", 404));
    }
  
    res.status(200).json(order);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ error: "Internal server error" });
  }
})
module.exports = router;
