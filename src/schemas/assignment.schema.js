import { db } from '../database/index.js';
import { logger } from '../utils/index.js';

export const CreateAssignmentTable = async () => {
    try {
        const tableExists = await db.schema.hasTable('assignments');
        if (!tableExists) {
            await db.schema.createTable('assignments', (table) => {
                table.increments('id').primary(); 
                table
                    .integer('course_id') 
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('courses')
                    .onDelete('CASCADE') 
                    .onUpdate('CASCADE'); 

                table
                    .integer('student_id') 
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('students')
                    .onDelete('CASCADE') 
                    .onUpdate('CASCADE'); 

                table
                    .integer('teacher_id') 
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('teachers')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
            });
            logger.info('Assignments table created successfully.');
        } else {
            logger.info('Assignments table already exists.');
        }
    } catch (error) {
        logger.error(`Error creating assignments table: ${error.message}`);
        throw new Error(error.message);
    } 
};
