import knex from 'knex'
import { config } from '../config/index.js'

export const db = knex({
    client: 'pg',
    connection: {
        host: config.postgres.host,
        port: config.postgres.port,
        user: config.postgres.user,
        password: config.postgres.password,
        database: config.postgres.database,
    },
})
