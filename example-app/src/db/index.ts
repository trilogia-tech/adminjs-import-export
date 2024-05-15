import { Adapter, Database, Resource } from '@adminjs/sql'
import AdminJS from 'adminjs'

AdminJS.registerAdapter({
  Database,
  Resource
})

const adapter = new Adapter('postgresql', {
  connectionString: process.env.POSTGRES_URI,
  database: process.env.POSTGRES_DB
})

const initialize = async () => {
  try {
    const database = await adapter.init()
    console.log('Connection has been established successfully.')

    return database
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return null
  }
}

export default initialize
