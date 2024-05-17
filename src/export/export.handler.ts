import { ActionHandler, ActionResponse, buildFeature, FeatureType, RecordActionResponse } from 'adminjs'
import { bundleComponent } from '../bundle-component.js'
import ExportComponent from '../components/ExportComponent.js'
import { exportBulkHandlerFactory, exportRecordHandlerFactory, exportResourceHandlerFactory } from './export.handler.factory.js'
import { defaultOptions } from './export.options.default.js'
import { ExportOptions } from './export.options.type.js'

/**
 * Exports a feature with the given options.
 *
 * @param options - The export options.
 * @returns The exported feature.
 * @throws Error if the handler or component is not defined.
 */
export const exportFeature = (options: ExportOptions): FeatureType => {
  const opts = Object.assign({}, defaultOptions, options)
  const { componentLoader } = opts
  const actions = {}

  let handler: undefined | ActionHandler<ActionResponse | RecordActionResponse>

  const component = bundleComponent(componentLoader, ExportComponent.name)

  if (opts.actionType === 'resource') {
    handler = exportResourceHandlerFactory(opts)
  }
  if (opts.actionType === 'record') {
    handler = exportRecordHandlerFactory(opts)
  }
  if (opts.actionType === 'bulk') {
    handler = exportBulkHandlerFactory(opts)
  }

  if (!handler) throw new Error('Handler is not defined')
  if (!component) throw new Error('Component is not defined')

  actions['export'] = {
    component: component,
    handler: handler,
    actionType: opts.actionType,
    isVisible: opts.isVisible,
    isAccessible: opts.isAccessible,
    icon: opts.icon
  }

  return buildFeature({
    actions
  })
}
