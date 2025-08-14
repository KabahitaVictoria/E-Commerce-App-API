// import product model from models directory
import ProductSchema from '../models/product.model.js';

// function to create a new product
const createProduct = async (req, res) => {
    try {
        const product = await ProductSchema.create(req.body);
        res.status(201).json({ message: `Product ${product.name} has been created successfully.`, data: product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// function to get all products
const getProducts = async (req, res) => {
    try {
        const products = await ProductSchema.find();
        res.status(200).json({ data: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// function to get a product by id
const getProductById = async (req, res) => {
    try {
        const product = await ProductSchema.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json({ data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// function to update a product partially
const updateProductPartial = async (req, res) => {
    const product = await ProductSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json({ message: 'Product updated successfully.', data: product });
}

// function to update a product fully
const updateProductFull = async (req, res) => {
    const product = await ProductSchema.findOneAndReplace({ _id: req.params.id }, req.body, { new: true });
    res.status(200).json({ message: 'Product replaced successfully.', data: product });
}

// function to delete a product
const deleteProduct = async (req, res) => {
    const product = await ProductSchema.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json({ message: 'Product deleted successfully.' });
}

// Exporting the functions to be used in routes
export {
    createProduct,
    getProducts,
    getProductById,
    updateProductPartial,
    updateProductFull,
    deleteProduct
};