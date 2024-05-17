import { ComponentLoader } from 'adminjs'
import { ExportOptions } from './export.options.type.js'

export const defaultOptions: ExportOptions = {
  componentLoader: new ComponentLoader(),
  actionType: 'resource'
}
