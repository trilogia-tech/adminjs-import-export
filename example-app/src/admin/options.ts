import { DatabaseMetadata } from '@adminjs/sql'
import { AdminJSOptions, ComponentLoader } from 'adminjs'
import { CreateRoleResource } from 'src/db/models/roles.js'
import { CreateUserResource } from 'src/db/models/users.js'
import componentLoader from './component-loader.js'

export type ResourceFactoryOptions = {
  componentLoader: ComponentLoader
  database: DatabaseMetadata
}

export default (database: DatabaseMetadata): AdminJSOptions => ({
  componentLoader,
  rootPath: '/admin',
  resources: [
    CreateUserResource({
      database,
      componentLoader
    }),
    CreateRoleResource({
      database,
      componentLoader
    })
  ]
})
