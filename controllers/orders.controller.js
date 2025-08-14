// import order model from models directory
import OrderSchema from '../models/order.model.js';

// function to create a new order
const createOrder = async (req, res) => {
    try {
        const order = await OrderSchema.create(req.body);
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
}

// function to get all orders
const getOrders = async (req, res) => {
    try {
        // find all orders and populate user_id and order_items.product_id with their respective fields
        const orders = await OrderSchema.find().populate('user_id', 'username').populate('order_items.product_id', 'name price');
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
}

// function to get a single order by id
const getOrderById = async (req, res) => {
    try {
        // find an order by id and populate user_id and order_items.product_id with their respective fields
        const order = await OrderSchema.findById(req.params.id).populate('user_id', 'username').populate('order_items.product_id', 'name price');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
}

// function to cancel an order by id
const cancelOrder = async (req, res) => {
    try {
        // find an order by id and update its status to 'cancelled'
        const order = await OrderSchema.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // send a response with status 200: success
        res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling order', error: error.message });
    }
}

// export the functions to be used in routes
export { 
    createOrder, 
    getOrders, 
    getOrderById, 
    cancelOrder 
};