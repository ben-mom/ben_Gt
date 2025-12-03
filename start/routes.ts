/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import EventsController from '#controllers/events_controller'

 router.post('/register', [ AuthController, 'register']).as('auth.register')
  router.post('/login', [ AuthController, 'login']).as('auth.login')
   router.get('/me', [ AuthController, 'me']).as('auth.me').use(middleware.auth())
   router.get('/', async () => {
  return { message: "Bienvenue sur mon API Adonis !" }
})

const eventsController = () => import('#controllers/events_controller')
 router
 .group(()=>{
  router.get('/', [eventsController, 'liste'])
 })
  .prefix('/events')

router
  .group(() => {
    router.post('/events', [EventsController, 'store'])   // création
    router.put('/events/:id', [EventsController, 'update']) // édition
  })
  .use(async ({ auth }, next) => {
    await auth.authenticate()  // protection
    return next()
  })