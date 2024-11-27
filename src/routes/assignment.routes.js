import express from 'express'
import { createAssignmentController, getAllAssignmentsController, getAssignmentByIdController, updateAssignmentController, deleteAssignmentController } from '../controllers/index.js'

export const assignmentRouter = express.Router()

assignmentRouter.post('/', createAssignmentController)

assignmentRouter.get('/', getAllAssignmentsController)

assignmentRouter.get('/:id', getAssignmentByIdController)
assignmentRouter.put('/:id', updateAssignmentController)

assignmentRouter.delete('/:id', deleteAssignmentController)

