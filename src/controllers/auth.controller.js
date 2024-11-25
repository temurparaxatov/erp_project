import { createUserService, loginUserService, getUserService } from '../services/index.js';
import { logger } from '../utils/index.js';

export const registerController = async (req, res,next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const newUser = await createUserService({ name, email, password, role });

        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error) {
        next(error)
    }
};

export const loginController = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const { token, user } = await loginUserService({ email, password });

        res.status(200).json({
            message: 'Login successful',
            token,
            user,
        });
    } catch (error) {
        next(error)
    }
};

export const getUserController = async (req, res,next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await getUserService('id', id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User fetched successfully',
            user,
        });
    } catch (error) {
        next(error)
    }
};
