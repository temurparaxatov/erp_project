import { db } from '../database/index.js'
import { logger } from '../utils/index.js'

export const CreateCoursesTable = async () => {
    try {
        const tableExists = await db.schema.hasTable('courses')
        if (!tableExists) {
            await db.schema.createTable('courses', (table) => {
                table.increments('id').primary()
                table.string('name').notNullable()
                table.text('description')
                table.timestamp('start_time').notNullable()
                table.timestamp('end_time').notNullable()
            })
            logger.info('Courses table succesfully created.')
        } else {
            logger.info('courses table exists.')
        }
    } catch (error) {
        logger.error(`Error: ${error.message}`)
        throw new Error(error.message)
    } 
}