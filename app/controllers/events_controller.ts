 import type { HttpContext } from '@adonisjs/core/http'
 import Event from '#models/Event'

export default class EventsController {
    public async liste({response}: HttpContext ) {
        const events = await Event.all()
        return response.json(events)
    } 
    // POST /events
    public async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'name', 'lieux', 'categorie', 'date'])

    const event = await Event.create(data)

    return response.created(event)
  }
  // PUT /events/:id

  
     async update({ params, request, response }: HttpContext) {
    const event = await Event.find(params.id)

    if (!event) {
      return response.notFound({ message: 'Event not found' })
    }

    const data = request.only(['title', 'name', 'lieux', 'categorie', 'date'])

    event.merge(data)
    await event.save()

    return response.ok(event)
  }

}


  


