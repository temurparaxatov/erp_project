import { db } from '../database/index.js'
import { logger } from '../utils/index.js'

export const createStudent = async (userId, permission = false) => {
    try {
        const [newStudent] = await db('students')
            .insert({ user_id: userId, permission })
            .returning('*');
        logger.info(`Student created with ID: ${newStudent.id}`);
        return newStudent;
    } catch (error) {
        logger.error(`Error creating student: ${error.message}`);
        throw new Error('Error creating student');
    }
}

export const getAllStudents = async () => {
    try {
        const students = await db('students').select('*');
        return students;
    } catch (error) {
        logger.error(`Error retrieving students: ${error.message}`);
        throw new Error('Error retrieving students');
    }
}

export const getStudentById = async (id) => {
    try {
        const student = await db('students').where('id', id).first();
        if (!student) {
            throw new Error('Student not found');
        }
        return student;
    } catch (error) {
        logger.error(`Error retrieving student by ID: ${error.message}`);
        throw error;
    }
}

export const updateStudent = async (id, userId, permission) => {
    try {
        const updatedStudent = await db('students')
            .where('id', id)
            .update({ user_id: userId, permission })
            .returning('*');
        if (!updatedStudent.length) {
            throw new Error('Student not found or not updated');
        }
        logger.info(`Student with ID ${id} updated`);
        return updatedStudent[0];
    } catch (error) {
        logger.error(`Error updating student: ${error.message}`);
        throw new Error('Error updating student');
    }
}

export const deleteStudent = async (id) => {
    try {
        const deletedCount = await db('students').where('id', id).del();
        if (deletedCount === 0) {
            throw new Error('Student not found or already deleted');
        }
        logger.info(`Student with ID ${id} deleted`);
        return { message: 'Student deleted successfully' };
    } catch (error) {
        logger.error(`Error deleting student: ${error.message}`);
        throw new Error('Error deleting student');
    }
}
