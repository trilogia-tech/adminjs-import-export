import { BaseRecord } from 'adminjs'
import { ExporterType } from './export.type.js'
import { csvExporter } from './modules/csv/csv.exporter.js'
import { jsonExporter } from './modules/json/json.exporter.js'
import { xmlExporter } from './modules/xml/xml.exporter.js'

export type Exporter = (records: BaseRecord[]) => string

export const Parsers: Record<ExporterType, { export: Exporter }> = {
  json: { export: jsonExporter },
  csv: { export: csvExporter },
  xml: { export: xmlExporter }
}
