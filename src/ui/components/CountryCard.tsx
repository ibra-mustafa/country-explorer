import { Link } from 'react-router';
import type { Country } from '../../core/models/Country';
import FavoriteButton from './FavoriteButton';

const CountryCard: React.FC<{country: Country}> = ({ country }) => (
  <div className="card country-card" style={{ position: 'relative' }}>
    <Link to={`/country/${country.cca3}`} style={{ display: 'block', textDecoration: 'none' }}>
      <img src={country.flag} alt={`${country.name} flag`} style={{ width: '100%', height: 'auto' }} />
      <div className="country-card-content">
        <h2>{country.name}</h2>
        <div>
          <div className="text-secondary">Region: {country.region}</div>
          <div className="text-secondary">Population: {country.population.toLocaleString()}</div>
        </div>
      </div>
    </Link>
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <FavoriteButton country={country} />
    </div>
  </div>
);

export default CountryCard;
