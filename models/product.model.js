import { Schema, model } from 'mongoose';

// define the schema for products
const ProductSchema = new Schema({
    name: { 
        type: String, 
        required: true,
    },
    image: { 
        type: String, 
        required: true,
    },
    description: { 
        type: String, 
        required: true,
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    quantity: { 
        type: Number, 
        required: true, 
        default: 0, 
        min: 0 
    },
    status: { 
        type: String, 
        enum: ['in stock', 'out of stock'], 
        default: 'in stock' 
    }
  }, { timestamps: true });

// create and export the Product model using the defined schema
export default model('Product', ProductSchema);