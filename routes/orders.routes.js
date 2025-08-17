import { Router } from "express"; // Router helps to create routes in Express
import {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
} from "../controllers/orders.controller.js";

// creating a new router instance that will handle order-related routes
const orderRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management endpoints
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - order_items
 *               - total_price
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user placing the order
 *               order_items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_id
 *                     - name
 *                     - price
 *                     - quantity
 *                   properties:
 *                     product_id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *               total_price:
 *                 type: number
 *             example:
 *               user_id: 64d0c2a5f1e123456789abcd
 *               order_items:
 *                 - product_id: 64d0c2a5f1e123456789ef01
 *                   name: Nike Air Max
 *                   price: 250000
 *                   quantity: 2
 *               total_price: 500000
 *     responses:
 *       201:
 *         description: Order created successfully
 *       500:
 *         description: Error creating order
 */
orderRouter.post("/", createOrder); // Route to create a new order

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *       500:
 *         description: Error fetching orders
 */
orderRouter.get("/", getOrders); // Route to get all orders

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       404:
 *         description: Order not found
 */
orderRouter.get("/:id", getOrderById); // Route to get a specific order by ID

/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     summary: Cancel an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Error cancelling order
 */
orderRouter.patch("/:id", cancelOrder); // Route to cancel an order by ID

// Exporting the orderRouter to be used in the main application
export default orderRouter;
