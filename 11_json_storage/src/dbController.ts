import pgPromise from 'pg-promise'

const pgp = pgPromise()

const userDb = pgp({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB || 'postgres',
  user: process.env.POSTGRES_USER || 'postgres',
  password: 'strongPassword'
})

export default userDb
