import React, { useEffect, useState } from 'react'
import CountryCard from '../components/CountryCard'
import { RestCountriesApi } from '../../infrastructure/restCountriesApi/RestCountriesApi'
import { fetchCountries } from '../../core/usecases/fetchCountries'
import type { Country } from '../../core/models/Country'

const repo = new RestCountriesApi()

const HomePage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchCountries(repo)
      .then((data) => {
        if (!cancelled) setCountries(data)
      })
      .catch((err) => {
        if (!cancelled) setError(String(err))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main style={{maxWidth: 1000, margin: '1rem auto', padding: '0 1rem'}}>
      {loading && <p>Loading countries…</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {!loading && !error && (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: 12}}>
          {countries.map((c) => (
            <CountryCard key={c.cca3 ?? c.name} country={c} />
          ))}
        </div>
      )}
    </main>
  )
}

export default HomePage
