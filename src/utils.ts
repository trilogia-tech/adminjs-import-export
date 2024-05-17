import { ActionContext, ActionHandler, ActionRequest, ActionResponse, BaseRecord, BaseResource, Filter, ParamsType, ValidationError } from 'adminjs'
import { csvImporter } from './modules/csv/csv.importer.js'
import { jsonImporter } from './modules/json/json.importer.js'
import { xmlImporter } from './modules/xml/xml.importer.js'
import { Importer } from './parsers.js'

export const saveRecords = async (records: Record<string, unknown>[], resource: BaseResource): Promise<BaseRecord[]> => {
  const results = records.map(async (record) => {
    try {
      return await resource.create(record)
    } catch (e) {
      console.error(e)
      throw e
    }
  })

  return Promise.all(results.map((r) => new BaseRecord(r, resource)))
}

export const getImporterByFileName = (fileName: string): Importer => {
  if (fileName.includes('.json')) {
    return jsonImporter
  }
  if (fileName.includes('.csv')) {
    return csvImporter
  }
  if (fileName.includes('.xml')) {
    return xmlImporter
  }
  throw new Error('No parser found')
}

export const postActionHandler =
  (handler: ActionHandler<ActionResponse>): ActionHandler<ActionResponse> =>
  async (request, response, context) => {
    if (request.method !== 'post') {
      return {}
    }

    return handler(request, response, context)
  }

export const getFileFromRequest = (request: ActionRequest) => {
  const file = request.payload?.file

  if (!file?.path) {
    throw new ValidationError({
      file: { message: 'No file uploaded' }
    })
  }

  return file
}

export const getRecords = async (context: ActionContext): Promise<BaseRecord[]> => {
  const idProperty = context.resource
    .properties()
    .find((p) => p.isId())
    ?.name?.()
  const titleProperty = context.resource.decorate().titleProperty()?.name?.()

  return context.resource.find(new Filter({}, context.resource), {
    limit: Number.MAX_SAFE_INTEGER,
    sort: {
      sortBy: idProperty ?? titleProperty,
      direction: 'asc'
    }
  })
}
