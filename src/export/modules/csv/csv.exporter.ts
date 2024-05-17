import { BaseRecord } from 'adminjs'
import { Parser } from 'json2csv'

export const csvExporter = (records: BaseRecord[]): string => {
  const recs = records ?? []
  const parser = new Parser({
    delimiter: ';'
  })
  return parser.parse(recs.filter((r) => !!r).map((r) => r.params))
}
