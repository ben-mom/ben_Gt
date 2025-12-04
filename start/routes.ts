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

// router.post('/create', [ EventsController , 'create'])

const eventsController = () => import('#controllers/events_controller')
 router
 .group(()=>{
  router.get('/', [eventsController, 'liste'])
 router.post('/', [ EventsController, 'store']) 
 router.put('//:id', [EventsController, 'update'])
 })
  .prefix('/events')
  
// router
  // .group(() => {
  //   // router.post('/events', [eventsController, 'store'])   // création
  //   // édition
  // })
  // .use(async ({ auth }, next) => {
  //   await auth.authenticate()  // protection
  //   return next()
  // })

//   router.group(() => {
//   router.post('/profile', '#controllers/users_controller.profile')
//   .use(middleware.auth())

// }).prefix('/api')
