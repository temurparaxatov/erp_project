import { createCourse, getCourseById, getAllCourses, updateCourse, deleteCourse } from '../services/index.js'
import { logger } from '../utils/index.js'

export const createCourseController = async (req, res) => {
    try {
        const { name, description, startTime, endTime } = req.body;
        if (!name || !startTime || !endTime) {
            return res.status(400).json({ message: 'Name, start time, and end time are required' });
        }
        const newCourse = await createCourse(name, description, startTime, endTime);
        return res.status(201).json(newCourse);
    } catch (error) {
        logger.error(`Error in createCourseController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const getAllCoursesController = async (req, res) => {
    try {
        const courses = await getAllCourses();
        return res.status(200).json(courses);
    } catch (error) {
        logger.error(`Error in getAllCoursesController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const getCourseByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await getCourseById(id);
        return res.status(200).json(course);
    } catch (error) {
        logger.error(`Error in getCourseByIdController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const updateCourseController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, startTime, endTime } = req.body;
        if (!name || !startTime || !endTime) {
            return res.status(400).json({ message: 'Name, start time, and end time are required' });
        }
        const updatedCourse = await updateCourse(id, name, description, startTime, endTime);
        return res.status(200).json(updatedCourse);
    } catch (error) {
        logger.error(`Error in updateCourseController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCourseController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteCourse(id);
        return res.status(200).json(result);
    } catch (error) {
        logger.error(`Error in deleteCourseController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}
