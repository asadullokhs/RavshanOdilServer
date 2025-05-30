const Order = require("../models/Order");
const Package = require("../models/Package");

const orderCtrl = {
  // Create a new order
  createOrder: async (req, res) => {
    try {
      const { fullName, phoneNumber, package: packageId, quantity } = req.body;

      // Check if package exists
      const existingPackage = await Package.findById(packageId);
      if (!existingPackage) {
        return res.status(404).json({ error: "Package not found" });
      }

      const newOrder = new Order({
        fullName,
        phoneNumber,
        package: packageId,
        quantity,
      });

      await newOrder.save();

      res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (err) {
      console.error("Create Order Error:", err);
      res.status(500).json({ error: "Failed to create order" });
    }
  },

  // Get all orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().populate("package");
      res.status(200).json(orders);
    } catch (err) {
      console.error("Get Orders Error:", err);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  },

  // Get a single order by ID
  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate("package");
      if (!order) return res.status(404).json({ error: "Order not found" });

      res.status(200).json(order);
    } catch (err) {
      console.error("Get Order Error:", err);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  },

  // Delete order
  deleteOrder: async (req, res) => {
    try {
      const deleted = await Order.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: "Order not found" });

      res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
      console.error("Delete Order Error:", err);
      res.status(500).json({ error: "Failed to delete order" });
    }
  },
};

module.exports = orderCtrl;