import type { CountriesRepository } from '../../core/ports/CountriesRepository'
import { mapRestCountryToCountry } from '../../core/models/Country'

export class RestCountriesApi implements CountriesRepository {
  private base = 'https://restcountries.com/v3.1'

  async fetchAll() {
    const url = `${this.base}/all?fields=name,flags,region,population,cca3`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch countries: ${res.status}`)
    const data = await res.json()
    return Array.isArray(data) ? data.map(mapRestCountryToCountry) : []
  }
}
