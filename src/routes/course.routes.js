import express from 'express'
import { createCourseController, getAllCoursesController, getCourseByIdController, updateCourseController, deleteCourseController } from '../controllers/index.js'

export const courseRouter = express.Router()

courseRouter.post('/', createCourseController)

courseRouter.get('/', getAllCoursesController)

courseRouter.get('/:id', getCourseByIdController)

courseRouter.put('/:id', updateCourseController)

courseRouter.delete('/:id', deleteCourseController)


