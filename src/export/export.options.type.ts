import { ActionContext, BaseRecord, ComponentLoader } from 'adminjs'
import { Column } from './formater.type.js'

/**
 * Represents the options for exporting data.
 */
export interface ExportOptions {
  /**
   * The component loader used to load the necessary components for exporting.
   */
  componentLoader: ComponentLoader

  /**
   * The type of export: 'resource' or 'record'.
   */
  type: 'resource' | 'record'

  /**
   * Indicates whether the export component is visible.
   */
  isVisible?: boolean

  /**
   * The columns to include in the export.
   */
  columns?: Column[]

  /**
   * A function that retrieves the records to export.
   * @param context - The action context.
   * @returns A promise that resolves to an array of base records.
   */
  getRecords?: (context: ActionContext) => Promise<BaseRecord[]>
}
export interface ExportOptions {
  componentLoader: ComponentLoader
  type: 'resource' | 'record'
  isVisible?: boolean
  columns?: Column[]
  getRecords?: (context: ActionContext) => Promise<BaseRecord[]>
}
