import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Event extends BaseModel {
  public static table = 'events'

  @column({ isPrimary: true })
  declare id: number
   @column()
  declare name: string

  @column()
  declare catégorie: string | null
 @column()
  declare  date: string| null
  
  @column()
  declare lieux: string | null

 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
