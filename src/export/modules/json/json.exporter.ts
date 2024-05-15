import { BaseRecord } from 'adminjs'

export const jsonExporter = (records: BaseRecord[]): string => {
  return JSON.stringify(records.filter((r) => !!r).map((r) => r.params))
}
