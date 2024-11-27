import { db } from '../database/index.js'
import { logger } from '../utils/index.js'

export const createAssignment = async (course_id, student_id, teacher_id) => {
    try {
        const [newAssignment] = await db('assignments')
            .insert({ course_id, student_id, teacher_id })
            .returning('*');
        logger.info(`Assignment created with ID: ${newAssignment.id}`);
        return newAssignment;
    } catch (error) {
        logger.error(`Error creating assignment: ${error.message}`);
        throw new Error('Error creating assignment');
    }
}

export const getAllAssignments = async () => {
    try {
        const assignments = await db('assignments')
            .select('assignments.id', 'courses.name as course_name', 'students.name as student_name', 'teachers.name as teacher_name')
            .join('courses', 'assignments.course_id', '=', 'courses.id')
            .join('students', 'assignments.student_id', '=', 'students.id')
            .join('teachers', 'assignments.teacher_id', '=', 'teachers.id');
        return assignments;
    } catch (error) {
        logger.error(`Error retrieving assignments: ${error.message}`);
        throw new Error('Error retrieving assignments');
    }
}

export const getAssignmentById = async (id) => {
    try {
        const assignment = await db('assignments')
            .select('assignments.id', 'courses.name as course_name', 'students.name as student_name', 'teachers.name as teacher_name')
            .join('courses', 'assignments.course_id', '=', 'courses.id')
            .join('students', 'assignments.student_id', '=', 'students.id')
            .join('teachers', 'assignments.teacher_id', '=', 'teachers.id')
            .where('assignments.id', id)
            .first();
        
        if (!assignment) {
            throw new Error('Assignment not found');
        }
        return assignment;
    } catch (error) {
        logger.error(`Error retrieving assignment by ID: ${error.message}`);
        throw error;
    }
}

export const updateAssignment = async (id, course_id, student_id, teacher_id) => {
    try {
        const updatedAssignment = await db('assignments')
            .where('id', id)
            .update({ course_id, student_id, teacher_id })
            .returning('*');
        
        if (!updatedAssignment.length) {
            throw new Error('Assignment not found or not updated');
        }
        logger.info(`Assignment with ID ${id} updated`);
        return updatedAssignment[0];
    } catch (error) {
        logger.error(`Error updating assignment: ${error.message}`);
        throw new Error('Error updating assignment');
    }
}

export const deleteAssignment = async (id) => {
    try {
        const deletedCount = await db('assignments').where('id', id).del();
        if (deletedCount === 0) {
            throw new Error('Assignment not found or already deleted');
        }
        logger.info(`Assignment with ID ${id} deleted`);
        return { message: 'Assignment deleted successfully' };
    } catch (error) {
        logger.error(`Error deleting assignment: ${error.message}`);
        throw new Error('Error deleting assignment');
    }
}
