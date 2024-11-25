import { logger } from "../utils/index.js";
import { db } from "../database/index.js";
export const CreateUserTable = async () => {
    try {
        const tableExists = await db.schema.hasTable('users');
        if (!tableExists) {
            await db.schema.createTable('users', (table) => {
                table.increments('id').primary();
                table.string('google_id').unique();
                table.string('name').notNullable();
                table.string('email').notNullable().unique();
                table.string('password');
                table.enum('role', ['user', 'teacher', 'manager']).defaultTo('user');
                table.timestamp('created_at').defaultTo(db.fn.now());
                table.timestamp('updated_at').defaultTo(db.fn.now());
            });
        } else {
            logger.info('Users table already exists.');
        }
    } catch (error) {
        logger.error(`Error creating users table: ${error.message}`);
        throw new Error(error.message);
    }
};
