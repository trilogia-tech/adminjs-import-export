import { BaseRecord } from 'adminjs'
import { Parser } from 'json2csv'

export const csvExporter = (records: BaseRecord[]): string => {
  const parser = new Parser({
    delimiter: ';'
  })
  return parser.parse(records.filter((r) => !!r).map((r) => r.params))
}
