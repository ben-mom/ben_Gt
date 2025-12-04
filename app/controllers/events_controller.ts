 import type { HttpContext } from '@adonisjs/core/http'
 import Event from '#models/Event'
import { EventValidator } from '#validators/event'


export default class EventsController {  
    public async liste({response}: HttpContext ) {
        const events = await Event.all()
        return response.json(events)
    } 
    // POST /events
    public async store({ request, response }: HttpContext) {
    try {
      // 1. Validation des données
      const data = await request.validateUsing(EventValidator)

      // 2. Création dans la base
      const event = await Event.create(data)

      // 3. Réponse REST standard
      return response.created({
        message: 'Événement créé avec succès',
        data: event,
      })
    } catch (error) {
      // Gestion propre des erreurs
      return response.badRequest({
        message: 'Impossible de créer l’événement',
        error: error.messages || error,
      })
    }
  }
    // PUT /events/:id
    
  public async update({ params, request, response }: HttpContext) {
    const event = await Event.find(params.id)

    if (!event) {
      return response.notFound({ message: 'Event not found' })
    }

    const data = request.only(['name', 'lieux', 'categorie', 'date'])

    event.merge(data)
    await event.save()

    return response.ok(event)
  }
  // DELETE /events/:id
  public async destroy({ params, response }: HttpContext) {
    const event = await Event.find(params.id)

    if (!event) {
      return response.notFound({ message: 'Event not found' })
    }

    await event.delete()

    return response.ok({ message: 'Event deleted successfully' })
  }
}


  


