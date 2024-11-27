import { createAssignment, getAssignmentById, getAllAssignments, updateAssignment, deleteAssignment } from '../services/index.js'
import { logger } from '../utils/index.js'

export const createAssignmentController = async (req, res) => {
    try {
        const { course_id, student_id, teacher_id } = req.body;
        if (!course_id || !student_id || !teacher_id) {
            return res.status(400).json({ message: 'Course ID, Student ID, and Teacher ID are required' });
        }
        const newAssignment = await createAssignment(course_id, student_id, teacher_id);
        return res.status(201).json(newAssignment);
    } catch (error) {
        logger.error(`Error in createAssignmentController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const getAllAssignmentsController = async (req, res) => {
    try {
        const assignments = await getAllAssignments();
        return res.status(200).json(assignments);
    } catch (error) {
        logger.error(`Error in getAllAssignmentsController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const getAssignmentByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await getAssignmentById(id);
        return res.status(200).json(assignment);
    } catch (error) {
        logger.error(`Error in getAssignmentByIdController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const updateAssignmentController = async (req, res) => {
    try {
        const { id } = req.params;
        const { course_id, student_id, teacher_id } = req.body;
        if (!course_id || !student_id || !teacher_id) {
            return res.status(400).json({ message: 'Course ID, Student ID, and Teacher ID are required' });
        }
        const updatedAssignment = await updateAssignment(id, course_id, student_id, teacher_id);
        return res.status(200).json(updatedAssignment);
    } catch (error) {
        logger.error(`Error in updateAssignmentController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const deleteAssignmentController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteAssignment(id);
        return res.status(200).json(result);
    } catch (error) {
        logger.error(`Error in deleteAssignmentController: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}
