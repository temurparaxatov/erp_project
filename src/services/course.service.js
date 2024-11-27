import { db } from '../database/index.js'
import { logger } from '../utils/index.js'

export const createCourse = async (name, description, startTime, endTime) => {
    try {
        const [newCourse] = await db('courses')
            .insert({ name, description, start_time: startTime, end_time: endTime })
            .returning('*');
        logger.info(`Course created with ID: ${newCourse.id}`);
        return newCourse;
    } catch (error) {
        logger.error(`Error creating course: ${error.message}`);
        throw new Error('Error creating course');
    }
}

export const getAllCourses = async () => {
    try {
        const courses = await db('courses').select('*');
        return courses;
    } catch (error) {
        logger.error(`Error retrieving courses: ${error.message}`);
        throw new Error('Error retrieving courses');
    }
}

export const getCourseById = async (id) => {
    try {
        const course = await db('courses').where('id', id).first();
        if (!course) {
            throw new Error('Course not found');
        }
        return course;
    } catch (error) {
        logger.error(`Error retrieving course by ID: ${error.message}`);
        throw error;
    }
}

export const updateCourse = async (id, name, description, startTime, endTime) => {
    try {
        const updatedCourse = await db('courses')
            .where('id', id)
            .update({ name, description, start_time: startTime, end_time: endTime })
            .returning('*');
        if (!updatedCourse.length) {
            throw new Error('Course not found or not updated');
        }
        logger.info(`Course with ID ${id} updated`);
        return updatedCourse[0];
    } catch (error) {
        logger.error(`Error updating course: ${error.message}`);
        throw new Error('Error updating course');
    }
}

export const deleteCourse = async (id) => {
    try {
        const deletedCount = await db('courses').where('id', id).del();
        if (deletedCount === 0) {
            throw new Error('Course not found or already deleted');
        }
        logger.info(`Course with ID ${id} deleted`);
        return { message: 'Course deleted successfully' };
    } catch (error) {
        logger.error(`Error deleting course: ${error.message}`);
        throw new Error('Error deleting course');
    }
}
