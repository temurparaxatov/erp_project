import app from './src/app.js'
import { config } from './src/config/index.js'
import { logger } from './src/utils/index.js'

const bootstrap = async () => {
    try {
        app.listen(config.app.port, () => {
            logger.info(`Server runnning on  ${config.app.port} PORT`)
        })
    } catch (error) {
        logger.error(error)
    }
}

bootstrap()
