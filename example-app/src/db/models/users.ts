import { exportFeature } from '@trilogia/adminjs-import-export'
import { ActionContext, BaseRecord, Filter, ResourceWithOptions } from 'adminjs'
import { ResourceFactoryOptions } from '../../admin/options.js'

const RESOURCE_NAME = 'users'
export const CreateUserResource = (opts: ResourceFactoryOptions): ResourceWithOptions => ({
  resource: opts.database.table('users'),
  features: [
    exportFeature({
      actionType: 'resource',
      componentLoader: opts.componentLoader,
      isVisible: (_ctx) => true,
      columns: columnsToExport,
      getRecords: getRecordsToExport
    })
  ],
  options: {
    id: RESOURCE_NAME
  }
})

const columnsToExport = [
  { name: 'ID', key: 'id', callback: (value: string) => `#${value}` },
  { name: 'Name', key: 'name' },
  { name: 'Email', key: 'email' },
  { name: 'Updated At', key: 'updated_at', callback: (value: string) => new Date(value).toLocaleString() }
]

const getRecordsToExport: (context: ActionContext) => Promise<BaseRecord[]> = async (context) => {
  if (!context) throw new Error(`Context could not be found`)

  const resource = context._admin.findResource(RESOURCE_NAME)

  const records = await resource.find(new Filter({}, resource), {
    limit: Number.MAX_SAFE_INTEGER,
    sort: {
      sortBy: 'updated_at',
      direction: 'desc'
    }
  })

  return records
}
