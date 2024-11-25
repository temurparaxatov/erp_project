import { 
    CreateAssignmentTable, 
    CreateCoursesTable, 
    CreateStudentsTable, 
    CreateTeachersTable, 
    CreateUserTable 
} from '../schemas/index.js';
import { logger } from '../utils/index.js';

export const setupController = async (req, res, next) => {
    try {

        await CreateUserTable();

        await CreateStudentsTable();

        await CreateTeachersTable();

        await CreateCoursesTable();

        await CreateAssignmentTable();

        res.status(200).json({ message: 'Tables setup completed successfully.' });
    } catch (error) {
        logger.error(`Error during setup: ${error.message}`);
        res.status(500).json({ message: 'Error during setup.', error: error.message });
    }
};

