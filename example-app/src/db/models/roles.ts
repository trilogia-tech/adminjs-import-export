import { exportFeature } from '@trilogia/adminjs-import-export'
import { ActionContext, BaseRecord, ResourceWithOptions } from 'adminjs'
import { ResourceFactoryOptions } from '../../admin/options.js'

const RESOURCE_NAME = 'roles'
export const CreateRoleResource = (opts: ResourceFactoryOptions): ResourceWithOptions => ({
  resource: opts.database.table('roles'),
  features: [
    exportFeature({
      actionType: 'record',
      componentLoader: opts.componentLoader,
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

  const record = await resource.findOne(context.record.id())
  if (!record) throw new Error(`Record could not be found`)

  return [record]
}
