import type { Country } from '../models/Country'

export interface CountriesRepository {
  fetchAll(): Promise<Country[]>
}
