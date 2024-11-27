import express from 'express'
import { createTeacherController, getAllTeachersController, getTeacherByIdController, updateTeacherController, deleteTeacherController } from '../controllers/index.js'

export const teachersRouter = express.Router()

teachersRouter.post('/', createTeacherController)

teachersRouter.get('/', getAllTeachersController)

teachersRouter.get('/:id', getTeacherByIdController)

teachersRouter.put('/:id', updateTeacherController)

teachersRouter.delete('/:id', deleteTeacherController)


