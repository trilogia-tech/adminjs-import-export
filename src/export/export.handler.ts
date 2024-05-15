import { ActionHandler, ActionResponse, buildFeature, FeatureType, RecordActionResponse } from 'adminjs'
import { bundleComponent } from 'src/bundle-component.js'
import ExportComponent from 'src/components/ExportComponent.jsx'
import { exportRecordHandlerFactory, exportResourceHandlerFactory } from './export.handler.factory.js'
import { defaultOptions } from './export.options.default.js'
import { ExportOptions } from './export.options.type.js'
import { postRecordActionHandler, postResourceActionHandler } from './export.utils.js'

export const exportFeature = (options: ExportOptions): FeatureType => {
  const opts = Object.assign({}, defaultOptions, options)
  const { componentLoader } = opts
  const actions = {}

  let handler: undefined | ActionHandler<ActionResponse | RecordActionResponse>

  if (opts?.isVisible) {
    const component = bundleComponent(componentLoader, ExportComponent.name)

    if (opts.type === 'resource') {
      handler = postResourceActionHandler(exportResourceHandlerFactory(opts))
    }
    if (opts.type === 'record') {
      handler = postRecordActionHandler(exportRecordHandlerFactory(opts))
    }
    if (!handler) throw new Error('Handler is not defined')

    actions['export'] = {
      handler: handler,
      component: component,
      actionType: opts.type
    }
  }

  return buildFeature({
    actions
  })
}
