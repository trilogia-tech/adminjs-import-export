import AdminJSFastify from '@adminjs/fastify'
import AdminJS from 'adminjs'
import Fastify from 'fastify'
import provider from './admin/auth-provider.js'
import optionsFactory from './admin/options.js'
import databaseFactory from './db/index.js'

const port = process.env.PORT ? +process.env.PORT : 3000

const start = async () => {
  const server = Fastify()
  const db = await databaseFactory()
  const options = optionsFactory(db)
  const admin = new AdminJS(options)

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize()
  } else {
    admin.watch()
  }

  await AdminJSFastify.buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider
    },
    server,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true
    }
  )

  server.listen({ port }, (err, addr) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Server listening on ${addr}`)
      console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`)
    }
  })
}

start()
