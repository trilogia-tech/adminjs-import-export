import { ActionContext, ActionHandler, ActionRequest, ActionResponse, BaseRecord, Filter, RecordActionResponse, ValidationError } from 'adminjs'



export const postResourceActionHandler =
  (handler: ActionHandler<ActionResponse>): ActionHandler<ActionResponse> =>
  async (request, response, context) => {
    if (request.method !== 'post') {
      return {}
    }

    return handler(request, response, context)
  }

export const postRecordActionHandler =
  (handler: ActionHandler<RecordActionResponse>): ActionHandler<RecordActionResponse> =>
  async (request, response, context) => {
    const { record } = context
    if (!record) throw new Error(`Record of given id ("${request.params.recordId}") could not be found`)

    if (request.method !== 'post') {
      return {
        record: record.toJSON(context.currentAdmin)
      }
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
  const resource = context.resource.decorate()
  const idProperty = context.resource
    .properties()
    .find((p) => p.isId())
    ?.name?.()
  const titleProperty = resource.titleProperty()?.name?.()

  return context.resource.find(new Filter({}, context.resource), {
    limit: Number.MAX_SAFE_INTEGER,
    sort: {
      sortBy: idProperty ?? titleProperty,
      direction: 'asc'
    }
  })
}
