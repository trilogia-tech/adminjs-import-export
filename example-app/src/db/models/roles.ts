import { exportFeature } from '@trilogia/adminjs-import-export'
import { ActionContext, BaseRecord, Filter, ResourceWithOptions } from 'adminjs'
import { ResourceFactoryOptions } from 'src/admin/options.js'

const RESOURCE_NAME = 'roles'
export const CreateRoleResource = (opts: ResourceFactoryOptions): ResourceWithOptions => ({
  resource: opts.database.table('roles'),
  features: [
    exportFeature({
      type: 'record',
      componentLoader: opts.componentLoader,
      isVisible: true,
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
  { name: 'Name', key: 'name', callback: (value: string) => value.toUpperCase() }
]

const getRecordsToExport: (context: ActionContext) => Promise<BaseRecord[]> = async (context) => {
  if (!context.record) throw new Error(`Record could not be found`)

  const resource = context._admin.findResource(RESOURCE_NAME)
  const resourceDecorated = resource.decorate()

  const idProperty = resource
    .properties()
    .find((p) => p.isId())
    ?.name?.()

  const titleProperty = resourceDecorated.titleProperty()?.name?.()

  const records = await resource.find(
    new Filter(
      {
        collection_id: context.record.id()
      },
      resource
    ),
    {
      limit: Number.MAX_SAFE_INTEGER,
      sort: {
        sortBy: idProperty ?? titleProperty,
        direction: 'asc'
      }
    }
  )

  return records
}
