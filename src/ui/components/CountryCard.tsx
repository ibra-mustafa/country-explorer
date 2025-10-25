import React from 'react'
import type { Country } from '../../core/models/Country'

const CountryCard: React.FC<{country: Country}> = ({ country }) => (
  <article style={{border: '1px solid #ddd', borderRadius: 6, padding: 12}}>
    <img src={country.flag} alt={`${country.name} flag`} style={{width: '100%', height: 120, objectFit: 'cover', borderRadius: 4}} />
    <h3 style={{margin: '0.5rem 0'}}>{country.name}</h3>
    <div style={{fontSize: 12, color: '#555'}}>
      <div>Region: {country.region}</div>
      <div>Population: {country.population.toLocaleString()}</div>
    </div>
  </article>
)

export default CountryCard
