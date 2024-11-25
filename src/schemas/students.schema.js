import { db } from '../database/index.js'
import { logger } from '../utils/index.js'

export const CreateStudentsTable = async () => {
    try {
        const tableExists = await db.schema.hasTable('students')
        if (!tableExists) {
            await db.schema.createTable('students', (table) => {
                table.increments('id').primary()
                table.boolean('permission').notNullable().defaultTo(false)
                table
                    .integer('user_id')
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('users')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE')
            })
            logger.info('Students muvaffaqiyatli yaratildi.')
        } else {
            logger.info('table exists.')
        }
    } catch (error) {
        logger.error(`Errorw: ${error.message}`)
        throw new Error(error.message)
    } 
}
