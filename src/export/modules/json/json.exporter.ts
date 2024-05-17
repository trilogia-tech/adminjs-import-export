import { BaseRecord } from 'adminjs'

export const jsonExporter = (records: BaseRecord[]): string => {
  const recs = records ?? []
  return JSON.stringify(recs.filter((r) => !!r).map((r) => r.params))
}
