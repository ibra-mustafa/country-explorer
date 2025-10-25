import { Link } from 'react-router';
import type { Country } from '../../core/models/Country';

const CountryCard: React.FC<{country: Country}> = ({ country }) => (
  <Link to={`/country/${country.cca3}`}>
    <img src={country.flag} alt={`${country.name} flag`} />
    <h3>{country.name}</h3>
    <div>
      <div>Region: {country.region}</div>
      <div>Population: {country.population.toLocaleString()}</div>
    </div>
  </Link>
);

export default CountryCard;
