import express from 'express'
import { createStudentController, getAllStudentsController, getStudentByIdController, updateStudentController, deleteStudentController } from '../controllers/index.js'


export const studentRouter = express.Router()

studentRouter.post('/', createStudentController)

studentRouter.get('/', getAllStudentsController)

studentRouter.get('/:id', getStudentByIdController)

studentRouter.put('/:id', updateStudentController)

studentRouter.delete('/:id', deleteStudentController)

