import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js"
import { registerUserValidator, loginUserValidator, updateUserValidator, addUserValidator } from "../validators/user.js"

export const addUser = async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = addUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Check if user does not exist
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json("User already exist!");
        }
        // Hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        // Save user into database
        const createResult = await UserModel.create({
            ...value,
            password: hashedPassword
        });
        // Send user confirmation email
        // await mailTransporter.sendMail({
        //     to: value.email,
        //     subject: "User Registration",
        //     text: "Account registered successfully"
        // });
        // Respond to request
        res.json(createResult);
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        // Get total count of documents (BEFORE applying limit and skip)
        const totalCount = await UserModel.countDocuments({});
        // Fetch users from database
        const users = await UserModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip)
            .select({ password: false });
        // Set X-Total-Count header
        res.set('X-Total-Count', totalCount);
        // Return response
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const countUsers = async (req, res, next) => {
    try {
        const { filter = "{}" } = req.query;
        // Count users in database
        const count = await UserModel.countDocuments(JSON.parse(filter));
        // Respond to request
        res.json({ count });
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Get user by id from database
        const user = await UserModel
            .findById(id)
            .select({ password: false });
        if (!user) {
            return res.status(404).json('User not found!');
        }
        // Respond to request
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Validate user input
        const { error, value } = updateUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        const user = await UserModel.findByIdAndUpdate(id, value, { new: true });
        // Respond to request
        res.json(user);
    } catch (error) {
        next(error);

    }
}

export const registerUser = async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Check if user does not exist
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json("User already exist!");
        }
        // Hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        // Save user into database
        await UserModel.create({
            ...value,
            password: hashedPassword
        });
        // Send user confirmation email
        // await mailTransporter.sendMail({
        //     to: value.email,
        //     subject: "User Registration",
        //     text: "Account registered successfully"
        // });
        // Respond to request
        res.json("User registered");
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Find one user with identifier
        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json("User does not exist!");
        }
        // Compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json("Invalid credentials!");
        }
        // Sign a token for user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "24h" }
        );
        // Respond to request
        res.json({
            message: "User logged in!",
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
}

export const getProfile = async (req, res, next) => {
    try {
        // Find authenticated user from database
        const user = await UserModel
            .findById(req.auth.id)
            .select({ password: false });
        // Respond to request
        res.json(user);
    } catch (error) {
        next(error);

    }
}

export const updateProfile = async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = updateUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        await UserModel.findByIdAndUpdate(req.auth.id, value);
        res.json("User profile updated!");
    } catch (error) {
        next(error);

    }
}

export const logoutUser = (req, res, next) => {
    res.json("User logged out!");
}