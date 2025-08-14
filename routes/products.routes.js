import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProductPartial, updateProductFull, deleteProduct } from '../controllers/products.controller';

// creating a new router instance that will handle product-related routes
const productRouter = Router();

// Importing necessary functions from the products controller and defining routes
productRouter.post('/', createProduct); // Route to create a new product
productRouter.get('/', getProducts); // Route to get all products
productRouter.get('/:id', getProductById); // Route to get a specific product by ID
productRouter.patch('/:id', updateProductPartial); // Route to partially update a product by ID
productRouter.put('/:id', updateProductFull); // Route to fully update a product by ID
productRouter.delete('/:id', deleteProduct); // Route to delete a product by ID

// Exporting the productRouter to be used in the main application
export default productRouter;