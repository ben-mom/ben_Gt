import type { HttpContext } from '@adonisjs/core/http'
import Reservation from '#models/reservation.js'
import { ReservationValidator } from '#validators/reservation.js'

export default class ReservationsController {
  
  // 🟩 Créer une réservation
  public async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(ReservationValidator)
      const reservation = await Reservation.create(data)

      return response.created({
        message: 'Réservation créée avec succès',
        data: reservation,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la création',
        error: error.messages || error,
      })
    }
  }

  // 🟦 Lister toutes les réservations
    public async liste({response}: HttpContext ) {
        const reservations = await Reservation.all()
        return response.json(reservations)
    }

  // 🟨 Afficher une seule réservation
  public async show({ params, response }: HttpContext) {
    const reservation = await Reservation.findOrFail(params.id)
    return response.json(reservation)
  }

  // 🟧 Modifier une réservation
  public async update({ params, request, response }: HttpContext) {
    const reservation = await Reservation.find(params.id)
    if (!reservation) {
      return response.notFound({ message: 'Réservation introuvable' })
    }

    const data = await request.validateUsing(ReservationValidator)
    reservation.merge(data)
    await reservation.save()

    return { message: 'Réservation mise à jour', data: reservation }
  }

  // 🟥 Supprimer
  public async destroy({ params, response }: HttpContext) {
    const reservation = await Reservation.find(params.id)
    if (!reservation) {
      return response.notFound({ message: 'Réservation introuvable' })
    }

    await reservation.delete()
    return { message: 'Réservation supprimée' }
  }
}