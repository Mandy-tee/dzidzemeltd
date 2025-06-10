import { ProductModel } from "../models/product.js";
import { addProductValidator, updateProductValidator } from "../validators/product.js";

export const addProduct = async (req, res, next) => {
    try {
        // Validate user inputs
        const { error, value } = addProductValidator.validate({
            ...req.body,
            // image: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Write product to database
        const createResult = await ProductModel.create(value);
        // Respond to request
        res.status(201).json(createResult);
    } catch (error) {
        next(error);
    }
}

export const getProducts = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        // Get total count of documents (BEFORE applying limit and skip)
        const totalCount = await ProductModel.countDocuments({});
        // Fetch products from database
        const products = await ProductModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        // Set X-Total-Count header
        res.set('X-Total-Count', totalCount);
        // Return response
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

export const countProducts = async (req, res, next) => {
    try {
        const { filter = "{}" } = req.query;
        // Count products in database
        const count = await ProductModel.countDocuments(JSON.parse(filter));
        // Respond to request
        res.json({ count });
    } catch (error) {
        next(error);
    }
}

export const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Get product by id from database
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json('Product not found!');
        }
        // Respond to request
        res.json(product);
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        // Validate user inputs
        const { error, value } = updateProductValidator.validate({
            ...req.body,
            // image: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Update product in database
        const { id } = req.params;
        await ProductModel.updateOne({ _id: id }, value);
        // Respond to request
        res.status(200).json("Product updated!");
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Delete product by id from database
        await ProductModel.deleteOne({ _id: id });
        // Respond to request
        res.status(200).json("Product deleted!");
    } catch (error) {
        next(error);
    }
}