import { ComponentLoader } from 'adminjs'
import { ExportOptions } from './export.options.type.js'

export const defaultOptions: ExportOptions = {
  isVisible: true,
  componentLoader: new ComponentLoader(),
  type: 'resource'
}
