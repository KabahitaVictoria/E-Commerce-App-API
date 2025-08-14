import { Router } from 'express'; // Router helps to create routes in Express
import { createOrder, getOrders, getOrderById, cancelOrder } from '../controllers/orders.controller';

// creating a new router instance that will handle order-related routes
const orderRouter = Router();

// Importing necessary functions from the orders controller and defining routes
orderRouter.post('/', createOrder); // Route to create a new order
orderRouter.get('/', getOrders); // Route to get all orders
orderRouter.get('/:id', getOrderById); // Route to get a specific order by ID
orderRouter.patch('/:id', cancelOrder); // Route to cancel an order by ID

// Exporting the orderRouter to be used in the main application
export default orderRouter;