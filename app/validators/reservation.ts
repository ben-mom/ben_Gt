import vine from '@vinejs/vine'
import { defineValidator } from '#validators/core'

export const ReservationValidator = defineValidator(
  vine.compile(
    vine.object({
      client: vine.string().trim().minLength(2),
      date: vine.string().trim(),   // ou vine.date() si tu veux
      event_id: vine.number(),
      total: vine.number(),
      status: vine.string().trim(),
      paiement: vine.string().trim(),
    })
  )
)
