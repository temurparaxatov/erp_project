import { db } from '../database/index.js'
import { logger } from '../utils/index.js'

export const CreateTeachersTable = async () => {
    try {
        const tableExists = await db.schema.hasTable('teachers')
        if (!tableExists) {
            await db.schema.createTable('teachers', (table) => {
                table.increments('id').primary()
                table
                    .integer('user_id')
                    .notNullable()
                    .references('id')
                    .inTable('users')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')
            })
            logger.info('Teachers table created successfully.')
        } else {
            logger.info('Teachers table already exists.')
        }
    } catch (error) {
        logger.error(`Error creating teachers table: ${error.message}`)
        throw new Error(error.message)
    } 
}
