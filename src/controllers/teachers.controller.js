import { createTeacher, getTeacherById, getAllTeachers, updateTeacher, deleteTeacher } from '../services/index.js'
import { logger } from '../utils/index.js'

export const createTeacherController = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const newTeacher = await createTeacher(userId);
        return res.status(201).json(newTeacher);
    } catch (error) {
        logger.error(`Error in createTeacherController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const getAllTeachersController = async (req, res) => {
    try {
        const teachers = await getAllTeachers();
        return res.status(200).json(teachers);
    } catch (error) {
        logger.error(`Error in getAllTeachersController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const getTeacherByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await getTeacherById(id);
        return res.status(200).json(teacher);
    } catch (error) {
        logger.error(`Error in getTeacherByIdController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const updateTeacherController = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const updatedTeacher = await updateTeacher(id, userId);
        return res.status(200).json(updatedTeacher);
    } catch (error) {
        logger.error(`Error in updateTeacherController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const deleteTeacherController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteTeacher(id);
        return res.status(200).json(result);
    } catch (error) {
        logger.error(`Error in deleteTeacherController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}
