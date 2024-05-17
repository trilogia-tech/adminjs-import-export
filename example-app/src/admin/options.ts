import { DatabaseMetadata } from '@adminjs/sql'
import { AdminJSOptions, ComponentLoader } from 'adminjs'
import { CreatePermissionResource } from '../db/models/permissions.js'
import { CreateRoleResource } from '../db/models/roles.js'
import { CreateUserResource } from '../db/models/users.js'
import componentLoader from './component-loader.js'

export type ResourceFactoryOptions = {
  componentLoader: ComponentLoader
  database: DatabaseMetadata
}

export default (database: DatabaseMetadata): AdminJSOptions => {
  const resources = [CreateUserResource, CreateRoleResource, CreatePermissionResource].map((fn) => fn({ database, componentLoader }))
  return {
    componentLoader,
    rootPath: '/admin',
    resources
  }
}
