/**
 * Represents a column in a data export.
 */
export interface Column {
  /**
   * The name of the column.
   */
  name: string

  /**
   * The key of the column.
   */
  key?: string

  /**
   * A callback function to format the column value.
   * @param value - The original value of the column.
   * @returns The formatted value of the column.
   */
  callback?: (value: string) => string

  /**
   * The value of the column.
   */
  value?: string

  /**
   * An object that specifies how to concatenate multiple values.
   */
  concat?: {
    /**
     * The key of the concatenated column.
     */
    key?: string

    /**
     * An array of keys to concatenate.
     */
    keys?: string[]

    /**
     * The separator to use for concatenation.
     */
    separator: string
  }
}

export const columnDefinitions = [
  { name: 'Identificador do Lote', key: 'collection_identifier' },
  { name: 'Data Solicitação', key: 'created_at', callback: (value: string) => new Date(value).toLocaleString() },
  { name: 'Status', key: 'status_name' }
]
