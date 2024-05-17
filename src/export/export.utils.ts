import { ActionContext, ActionRequest, BaseRecord, Filter, ValidationError } from 'adminjs'

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
