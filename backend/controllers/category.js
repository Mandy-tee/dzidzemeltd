import { CategoryModel } from "../models/category.js";
import { addCategoryValidator, updateCategoryValidator } from "../validators/category.js";

export const addCategory = async (req, res, next) => {
    try {
        // Validate user inputs
        const { error, value } = addCategoryValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Write category to database
        const createResult = await CategoryModel.create(value);
        // Respond to request
        res.status(201).json(createResult);
    } catch (error) {
        next(error);
    }
}

export const getCategories = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        // Get total count of documents (BEFORE applying limit and skip)
        const totalCount = await CategoryModel.countDocuments({});
        // Fetch categories from database
        const categories = await CategoryModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        // Set X-Total-Count header
        res.set('X-Total-Count', totalCount);
        // Return response
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
}

export const countCategories = async (req, res, next) => {
    try {
        const { filter = "{}" } = req.query;
        // Count categories in database
        const count = await CategoryModel.countDocuments(JSON.parse(filter));
        // Respond to request
        res.json({ count });
    } catch (error) {
        next(error);
    }
}

export const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Get category by id from database
        const category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json('Category not found!');
        }
        // Respond to request
        res.json(category);
    } catch (error) {
        next(error);
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        // Validate user inputs
        const { error, value } = updateCategoryValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Update category in database
        const { id } = req.params;
        const category = await CategoryModel.findOneAndUpdate({ _id: id }, value, { new: true });
        // Respond to request
        res.status(200).json(category);
    } catch (error) {
        next(error);
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Delete category by id from database
        await CategoryModel.deleteOne({ _id: id });
        // Respond to request
        res.status(200).json("Category deleted!");
    } catch (error) {
        next(error);
    }
}