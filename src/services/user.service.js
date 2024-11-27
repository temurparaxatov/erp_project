import { db } from '../database/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createAccessAndRefresh, logger } from '../utils/index.js'
import {AppError} from '../utils/index.js';

export const getUserService = async (type, data = '') => {
    try {
        let query = db('users')
        switch (type) {
            case 'all':
                return await query.select('*')
            case 'id':
                return await query.where({ id: data }).select('*')
            case 'email':
                return await query.where({ email: data }).select('*')
            default:
                return []
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const createUserService = async (body) => {
    try {
        const { name, email, password, role } = body;

        const currentEmail = await db('users').where({ email }).first();
        if (currentEmail) {
            throw new AppError('Email already exists', 400); 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newData = await db('users')
            .insert({
                name,
                email,
                password: hashedPassword,
                role: role || 'user',
            })
            .returning('*');

        return newData;
    } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        if (error instanceof AppError) {
            throw error; 
        }
        throw new Error('Internal Server Error'); 
    }
};

export const loginUserService = async (body) => {
    try {
        const { email, password } = body

        const user = await getUserService('email', email)
        if (!user) {
            throw new Error('Invalid email or password')
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            throw new Error('Invalid email or password')
        }

        const token = createAccessAndRefresh(user)
        
        logger.info(`User logged in: ${email}`)
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        }
    } catch (error) {
        logger.error(`Error logging in: ${error.message}`)
        throw new Error(`Error logging in: ${error.message}`)
    }
}
