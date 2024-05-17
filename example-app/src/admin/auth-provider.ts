import { DefaultAuthProvider } from 'adminjs'
import componentLoader from './component-loader.js'
import { DEFAULT_ADMIN } from './constants.js'

/**
 * Make sure to modify "authenticate" to be a proper authentication method
 */
const provider = new DefaultAuthProvider({
  componentLoader,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authenticate: async ({ email, password }) => {
    // fake auth
    return { email: DEFAULT_ADMIN.email }
  }
})

export default provider