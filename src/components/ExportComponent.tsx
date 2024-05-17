import React, { FC, useState } from 'react'
import { Box, Button, Loader, Text } from '@adminjs/design-system'
import { ActionProps, ActionResponse, ApiClient, RecordActionResponse, useNotice, useTranslation } from 'adminjs'
import { AxiosResponse } from 'axios'
import { format } from 'date-fns'
import fileSaver from 'file-saver'
import { Exporters, ExporterType } from '../export/export.type.js'

const { saveAs } = fileSaver

export const mimeTypes: Record<ExporterType, string> = {
  json: 'application/json',
  csv: 'text/csv',
  xml: 'text/xml'
}

export const getExportedFileName = (extension: string) => `export-${format(Date.now(), 'yyyy-MM-dd_HH-mm')}.${extension}`

type Res = RecordActionResponse | ActionResponse
export const post = (actionProps: ActionProps, params: object): Promise<AxiosResponse<Res>> => {
  const { action, resource, record } = actionProps
  const api = new ApiClient()

  if (action.actionType === 'record') {
    if (!record) {
      throw new Error('Invalid action type')
    }
    return api.recordAction({
      method: 'post',
      recordId: record.id,
      resourceId: resource.id,
      actionName: 'export',
      params: params
    })
  } else
    return api.resourceAction({
      method: 'post',
      resourceId: resource.id,
      actionName: 'export',
      params: params
    })

  throw new Error('Invalid action type')
}

type PostParams = {
  type: ExporterType
  [key: string]: string | number | boolean | undefined | null
}

const ExportComponent: FC<ActionProps> = (props) => {
  const { translateMessage, translateComponent } = useTranslation()
  const [isFetching, setFetching] = useState<boolean>()
  const sendNotice = useNotice()

  const baseURL = new URL(window.location.href).origin
  const search = new URLSearchParams(window.location.search)
  const recordIds = search.get('recordIds')

  const exportData = async (params: PostParams) => {
    setFetching(true)
    try {
      const { type } = params
      const {
        data: { exportedData }
      } = await post(props, params)

      if (!exportedData) {
        const message = translateMessage('noRecordsToExport', props.resource.id, { defaultValue: 'No records to export' })
        sendNotice({ message, type: 'info' })
      } else {
        const blob = new Blob([exportedData], { type: mimeTypes[type] })

        saveAs(blob, getExportedFileName(type))

        const message = translateMessage('recordsExported', props.resource.id, { defaultValue: 'Exported successfully' })
        sendNotice({ message, type: 'success' })
      }
    } catch (e) {
      console.error({ params, e })
      const message = translateMessage('errorExporting', props.resource.id, { defaultValue: 'Error exporting' })
      sendNotice({ message, type: 'error' })
    }
    setFetching(false)
  }

  if (isFetching) {
    return <Loader />
  }

  const labelChooseFormat = translateComponent('labelChooseFormat', props.resource.id, { defaultValue: 'Choose format:' })

  return (
    <Box>
      <Box display='flex' justifyContent='center'>
        <Text variant='lg'>{labelChooseFormat}</Text>
      </Box>
      <Box display='flex' justifyContent='center'>
        {Exporters.map((parserType) => (
          <Box key={parserType} m={2}>
            <Button onClick={() => exportData({ type: parserType, recordIds, baseURL })} disabled={isFetching}>
              {parserType.toUpperCase()}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ExportComponent
