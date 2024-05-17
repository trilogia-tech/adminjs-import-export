import { exportFeature, FnGetRecord } from '@trilogia/adminjs-import-export'
import { NotFoundError, ResourceWithOptions } from 'adminjs'
import { ResourceFactoryOptions } from '../../admin/options.js'

const RESOURCE_NAME = 'permissions'
export const CreatePermissionResource = (opts: ResourceFactoryOptions): ResourceWithOptions => ({
  resource: opts.database.table('permissions'),
  features: [
    exportFeature({
      actionType: 'bulk',
      isVisible: (ctx) => !!ctx,
      isAccessible: (ctx) => !!ctx,
      icon: 'ChevronsDown',
      componentLoader: opts.componentLoader,
      columns: columnsToExport,
      getRecords: getRecordsToExport
    })
  ],
  options: {
    id: RESOURCE_NAME
  }
})

const columnsToExport = [{ name: 'Permission', key: 'name' }]

const getRecordsToExport: FnGetRecord = async (context, recordIds) => {
  if (!recordIds || !recordIds.length) throw new NotFoundError('no records were selected.', 'Action#handler')

  const resource = context._admin.findResource(RESOURCE_NAME)
  if (!resource) throw new NotFoundError('Resource not found.', 'Action#handler')

  const records = await resource.findMany(recordIds)

  return records
}
