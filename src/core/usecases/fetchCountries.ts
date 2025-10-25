import type { CountriesRepository } from '../ports/CountriesRepository'
import type { Country } from '../models/Country'

// Simple use-case: fetch all countries via the provided repository implementation.
export const fetchCountries = async (repo: CountriesRepository): Promise<Country[]> => {
  return repo.fetchAll()
}
