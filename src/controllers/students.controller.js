import { createStudent, getStudentById, getAllStudents, updateStudent, deleteStudent } from '../services/index.js'
import { logger } from '../utils/index.js'

export const createStudentController = async (req, res) => {
    try {
        const { userId, permission } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const newStudent = await createStudent(userId, permission);
        return res.status(201).json(newStudent);
    } catch (error) {
        logger.error(`Error in createStudentController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const getAllStudentsController = async (req, res) => {
    try {
        const students = await getAllStudents();
        return res.status(200).json(students);
    } catch (error) {
        logger.error(`Error in getAllStudentsController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const getStudentByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await getStudentById(id);
        return res.status(200).json(student);
    } catch (error) {
        logger.error(`Error in getStudentByIdController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const updateStudentController = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, permission } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const updatedStudent = await updateStudent(id, userId, permission);
        return res.status(200).json(updatedStudent);
    } catch (error) {
        logger.error(`Error in updateStudentController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}


export const deleteStudentController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteStudent(id);
        return res.status(200).json(result);
    } catch (error) {
        logger.error(`Error in deleteStudentController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}
