import User from '#models/user'
import { LoginValidator, RegisterValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
export default class AuthController {
  async register({ request, auth }: HttpContext) {
    const data = await request.validateUsing(RegisterValidator)

    const user = await User.create(data)

    return await auth.use('jwt').generate(user)
  }

  async login({ request, auth }: HttpContext) {
    const{email, password }=await request.validateUsing(LoginValidator)
    const user = await User.verifyCredentials(email, password)
    return await auth.use('jwt').generate(user)
    
  }

  async me({ auth }: HttpContext) {
    return {
       user: auth.use('jwt').getUserOrFail(),
    } 
  }
}
