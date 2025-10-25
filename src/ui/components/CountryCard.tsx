import { Link } from 'react-router';
import type { Country } from '../../core/models/Country';

const CountryCard: React.FC<{country: Country}> = ({ country }) => (
  <Link to={`/country/${country.cca3}`} className="card country-card">
    <img src={country.flag} alt={`${country.name} flag`} />
    <div className="country-card-content">
      <h2>{country.name}</h2>
      <div>
        <div className="text-secondary">Region: {country.region}</div>
        <div className="text-secondary">Population: {country.population.toLocaleString()}</div>
      </div>
    </div>
  </Link>
);

export default CountryCard;
