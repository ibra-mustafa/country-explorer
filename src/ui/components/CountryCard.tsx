import { Link } from 'react-router';
import type { Country } from '../../core/models/Country';

const CountryCard: React.FC<{country: Country}> = ({ country }) => (
  <Link to={`/country/${country.cca3}`} className="block border rounded-md p-3 bg-white dark:bg-gray-800 cursor-pointer hover:shadow">
    <img src={country.flag} alt={`${country.name} flag`} className="w-full h-32 object-cover rounded" />
    <h3 className="mt-2 text-sm font-medium">{country.name}</h3>
    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
      <div>Region: {country.region}</div>
      <div>Population: {country.population.toLocaleString()}</div>
    </div>
  </Link>
);

export default CountryCard;
