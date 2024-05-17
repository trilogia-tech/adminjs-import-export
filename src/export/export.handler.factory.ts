import { ActionContext, ActionHandler, ActionRequest, ActionResponse, BulkActionResponse, NotFoundError, RecordActionResponse } from 'adminjs'
import { ExportOptions } from './export.options.type.js'
import { Parsers } from './export.parser.js'
import { getRecords as defaultGetRecords } from './export.utils.js'
import { formatRecords } from './formater.handler.js'

const getParser = (request: ActionRequest) => {
  const qtype = request.query?.type as string
  const type = qtype && Object.keys(Parsers).includes(qtype) ? qtype : 'json'
  return Parsers[type as keyof typeof Parsers].export
}

const getRecordIds = (request: ActionRequest) => {
  const recordIds = request.query?.recordIds as string
  return recordIds ? recordIds.split(',') : undefined
}

const getData = async (args: { options: ExportOptions; request: ActionRequest; context: ActionContext }) => {
  const { options, request, context } = args
  const { columns, getRecords } = options
  const parser = getParser(request)
  const recordIds = getRecordIds(request)
  const getter = getRecords ?? defaultGetRecords

  const records = await getter(context, recordIds)
  const rawData = columns ? formatRecords(records, columns) : records

  return {
    records,
    data: parser(rawData)
  }
}

export const exportResourceHandlerFactory = (options: ExportOptions) => {
  const forResource: ActionHandler<ActionResponse> = async (request, response, context) => {
    if (request.method !== 'post') {
      return {}
    }

    const { data } = await getData({ options, request, context })
    if (!data || !data.length) return noExportedResponse({ context })

    return {
      exportedData: data
    }
  }
  return forResource
}

export const exportRecordHandlerFactory = (options: ExportOptions) => {
  const forRecord: ActionHandler<RecordActionResponse> = async (request, response, context) => {
    const { record } = context
    if (!record) throw new NotFoundError(`Record of given id ("${request.params.recordId}") could not be found`, 'Action#handler')

    if (request.method !== 'post') {
      return {
        record: record.toJSON(context.currentAdmin)
      }
    }

    const { data } = await getData({ options, request, context })
    if (!data || !data.length) return noExportedResponse({ context }) as RecordActionResponse

    return {
      record: record.toJSON(context.currentAdmin),
      exportedData: data
    }
  }

  return forRecord
}

export const exportBulkHandlerFactory = (options: ExportOptions) => {
  const forBulk: ActionHandler<BulkActionResponse> = async (request, response, context) => {
    const { h, records, currentAdmin } = context
    if (!currentAdmin) throw new NotFoundError('currentAdmin is not defined', 'Action#handler')

    if (request.method === 'get') {
      if (!records || !records.length) {
        throw new NotFoundError('no records were selected.', 'Action#handler')
      }
      return {
        records: records.map((record) => record.toJSON(currentAdmin))
      }
    }

    if (request.method === 'post') {
      try {
        const { records: recs, data } = await getData({ options, request, context })

        return {
          exportedData: data,
          records: recs.map((record) => record.toJSON(currentAdmin))
        }
      } catch (error) {
        if (error instanceof Error) return errorResponse({ context, error })
        throw error
      }
    }

    return notAllowedResponse({ context })
  }

  return forBulk
}

const noExportedResponse = (args: { context: ActionContext }) => {
  const { context } = args
  const { h, record } = context
  return {
    record: record?.toJSON(context.currentAdmin),
    records: [],
    exportedData: [],
    redirectUrl: h.resourceActionUrl({ resourceId: context.resourceId, actionName: 'list' }),
    notice: {
      message: 'No records to export',
      type: 'error'
    }
  } satisfies ActionResponse | RecordActionResponse
}

const notAllowedResponse = (args: { context: ActionContext }) => {
  const { context } = args
  const { h } = context
  return {
    records: [],
    exportedData: [],
    redirectUrl: h.resourceActionUrl({ resourceId: context.resourceId, actionName: 'list' }),
    notice: {
      message: 'Action not handled',
      type: 'error'
    }
  } satisfies ActionResponse | BulkActionResponse
}

const errorResponse = (args: { context: ActionContext; error: Error }) => {
  const { context, error } = args
  const { h } = context
  return {
    records: [],
    exportedData: [],
    redirectUrl: h.resourceActionUrl({ resourceId: context.resourceId, actionName: 'list' }),
    notice: {
      message: error.message,
      type: 'error'
    }
  } satisfies ActionResponse | BulkActionResponse
}
