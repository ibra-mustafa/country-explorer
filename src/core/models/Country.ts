export interface Country {
  name: string
  flag: string
  region: string
  population: number
  cca3?: string
}

// Helper to map API response to our domain model
export const mapRestCountryToCountry = (r: any): Country => ({
  name: r?.name?.common ?? r?.name ?? 'Unknown',
  flag: r?.flags?.svg ?? r?.flags?.png ?? '',
  region: r?.region ?? 'Unknown',
  population: typeof r?.population === 'number' ? r.population : 0,
  cca3: r?.cca3,
})
