import { ActionHandler, ActionResponse, RecordActionResponse } from 'adminjs'
import { ExportOptions } from './export.options.type.js'
import { Parsers } from './export.parser.js'
import { getRecords as defaultGetRecords } from './export.utils.js'
import { formatRecords } from './formater.handler.js'

export const exportResourceHandlerFactory = (options: ExportOptions) => {
  const exportHandler: ActionHandler<ActionResponse> = async (request, response, context) => {
    const { columns, getRecords } = options
    const parser = Parsers[request.query?.type ?? 'json'].export
    const getter = getRecords ?? defaultGetRecords

    const records = await getter(context)
    const parsedData = parser(columns ? formatRecords(records, columns) : (records as any))

    return {
      exportedData: parsedData
    }
  }

  return exportHandler
}

export const exportRecordHandlerFactory = (options: ExportOptions) => {
  const exportHandler: ActionHandler<RecordActionResponse> = async (request, response, context) => {
    const { record } = context
    if (!record) throw new Error(`Record of given id ("${request.params.recordId}") could not be found`)

    const { columns, getRecords } = options
    const parser = Parsers[request.query?.type ?? 'json'].export
    const getter = getRecords ?? defaultGetRecords

    const records = await getter(context)
    const data = columns ? formatRecords(records, columns) : (records as any)

    if (!data || !data.length)
      return {
        record: record.toJSON(context.currentAdmin),
        exportedData: [],
        notice: {
          message: 'No records to export',
          type: 'error'
        }
      }

    const exportedData = parser(data)

    return {
      record: record.toJSON(context.currentAdmin),
      exportedData
    }
  }

  return exportHandler
}
