// Import the model module for mongoose to define the Order model and its schema 
// and import the Schema constructor to create a new schema for orders
import { model, Schema } from 'mongoose';

// define the schema for order items
const OrderItemSchema = new Schema({
    product_id: { 
        // reference to the Product model using ObjectId 
        // this establishes a relationship between OrderItem and Product
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 1 
    }
  }, { _id: false }); // disable automatic creation of _id for subdocuments

// define the schema for orders
const OrderSchema = new Schema({
    user_id: { 
        // reference to the User model using ObjectId
        // this establishes a relationship between Order and User
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    order_items: { 
        // array of OrderItemSchema, allowing multiple items in an order
        type: [OrderItemSchema], 
        required: true 
    },
    total_price: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    status: { 
        type: String, 
        enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], 
        default: 'pending' 
    }
}, { timestamps: true }); // automatically manage createdAt and updatedAt fields

// create and export the Order model using the defined schema
export default model('Order', OrderSchema);