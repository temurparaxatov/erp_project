import { db } from '../database/index.js'
import { logger } from '../utils/index.js'

export const createTeacher = async (userId) => {
    try {
        const [newTeacher] = await db('teachers')
            .insert({ user_id: userId })
            .returning('*');
        logger.info(`Teacher created with ID: ${newTeacher.id}`);
        return newTeacher;
    } catch (error) {
        logger.error(`Error creating teacher: ${error.message}`);
        throw new Error('Error creating teacher');
    }
}

export const getTeacherById = async (id) => {
    try {
        const teacher = await db('teachers').where('id', id).first();
        if (!teacher) {
            throw new Error('Teacher not found');
        }
        return teacher;
    } catch (error) {
        logger.error(`Error retrieving teacher by ID: ${error.message}`);
        throw error;
    }
}

export const getAllTeachers = async () => {
    try {
        const teachers = await db('teachers').select('*');
        return teachers;
    } catch (error) {
        logger.error(`Error retrieving teachers: ${error.message}`);
        throw new Error('Error retrieving teachers');
    }
}

export const updateTeacher = async (id, userId) => {
    try {
        const updatedTeacher = await db('teachers')
            .where('id', id)
            .update({ user_id: userId })
            .returning('*');
        if (!updatedTeacher.length) {
            throw new Error('Teacher not found or not updated');
        }
        logger.info(`Teacher with ID ${id} updated`);
        return updatedTeacher[0];
    } catch (error) {
        logger.error(`Error updating teacher: ${error.message}`);
        throw new Error('Error updating teacher');
    }
}

export const deleteTeacher = async (id) => {
    try {
        const deletedCount = await db('teachers').where('id', id).del();
        if (deletedCount === 0) {
            throw new Error('Teacher not found or already deleted');
        }
        logger.info(`Teacher with ID ${id} deleted`);
        return { message: 'Teacher deleted successfully' };
    } catch (error) {
        logger.error(`Error deleting teacher: ${error.message}`);
        throw new Error('Error deleting teacher');
    }
}
