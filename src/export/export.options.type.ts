import { Action, ActionContext, ActionResponse, BaseRecord, ComponentLoader } from 'adminjs'
import { Column } from './formater.type.js'

type TAction = Pick<Partial<Action<ActionResponse>>, 'actionType' | 'isVisible' | 'isAccessible' | 'icon'>

/**
 * Represents a function that retrieves records based on the provided context and record IDs.
 *
 * @param context - The action context.
 * @param recordIds - Optional array of record IDs to retrieve. If not provided, all records will be retrieved.
 * @returns A promise that resolves to an array of base records.
 */
export type FnGetRecord = (context: ActionContext, recordIds?: string[]) => Promise<BaseRecord[]>

/**
 * Represents the options for exporting data.
 */
export interface ExportOptions extends TAction {
  /**
   * The component loader used to load the necessary components for exporting.
   */
  componentLoader: ComponentLoader

  /**
   * The columns to include in the export.
   */
  columns?: Column[]

  /**
   * A function that retrieves the records to export.
   * @param context - The action context.
   * @param recordIds - The IDs of the records to retrieve.
   * @returns A promise that resolves to an array of base records.
   */
  getRecords?: FnGetRecord
}
