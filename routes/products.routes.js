import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProductPartial, updateProductFull, deleteProduct } from '../controllers/products.controller.js';

// creating a new router instance that will handle product-related routes
const productRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - description
 *               - price
 *               - quantity
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [in stock, out of stock]
 *             example:
 *               name: Nike Air Max
 *               image: https://example.com/nike.jpg
 *               description: Comfortable running shoes
 *               price: 250000
 *               quantity: 100
 *               status: in stock
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 */
productRouter.post('/', createProduct); // Route to create a new product

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *       500:
 *         description: Server error
 */
productRouter.get('/', getProducts); // Route to get all products


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */
productRouter.get('/:id', getProductById); // Route to get a specific product by ID


/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Partially update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               price: 300000
 *               quantity: 120
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
productRouter.patch('/:id', updateProductPartial); // Route to partially update a product by ID

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Fully replace a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - description
 *               - price
 *               - quantity
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [in stock, out of stock]
 *             example:
 *               name: Adidas Ultraboost
 *               image: https://example.com/adidas.jpg
 *               description: Running shoes with extra comfort
 *               price: 280000
 *               quantity: 80
 *               status: in stock
 *     responses:
 *       200:
 *         description: Product replaced successfully
 *       404:
 *         description: Product not found
 */
productRouter.put('/:id', updateProductFull); // Route to fully update a product by ID

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
productRouter.delete('/:id', deleteProduct); // Route to delete a product by ID

// Exporting the productRouter to be used in the main application
export default productRouter;