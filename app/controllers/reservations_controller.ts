// // import type { HttpContext } from '@adonisjs/core/http'

// export default class ReservationsController {
// }import Event from '#models/Event'
// import Reservation from '#validators/reservation'
// import CreateReservationValidator from '#/Validators/CreateReservationValidator'

// export default class ReservationsController {
//   public async store({ auth, params, request, response }) {
//     // 1️⃣ Validation du payload
//     const payload = await request.validate(CreateReservationValidator)

//     // 2️⃣ Vérifier si l'événement existe
//     const event = await Event.find(params.id)
//     if (!event) {
//       return response.notFound({
//         status: 404,
//         error: 'Event not found',
//         message: `No event with ID ${params.id}`,
//       })
//     }

//     // 3️⃣ Créer réservation
//     const reservation = await Reservation.create({
//       eventId: event.id,
//       userId: auth.user!.id,
//       places: payload.places,
//       note: payload.note,
//     })

//     return response.created({
//       status: 201,
//       message: 'Reservation created successfully',
//       data: reservation,
//     })
//   }
// }
