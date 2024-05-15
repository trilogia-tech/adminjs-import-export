import { buildFeature, ComponentLoader, FeatureType } from 'adminjs'
import { bundleComponent } from './bundle-component.js'
import { importHandler } from './import.handler.js'
import { postActionHandler } from './utils.js'

type ImportExportFeatureOptions = {
  /**
   * Your ComponentLoader instance. It is required for the feature to add it's components.
   */
  componentLoader: ComponentLoader
}

const importExportFeature = (options: ImportExportFeatureOptions): FeatureType => {
  const { componentLoader } = options
  const importComponent = bundleComponent(componentLoader, 'ImportComponent')
  const exportComponent = bundleComponent(componentLoader, 'ExportComponent')

  return buildFeature({
    actions: {
      import: {
        handler: postActionHandler(importHandler),
        component: importComponent,
        actionType: 'resource'
      }
    }
  })
}

export default importExportFeature
