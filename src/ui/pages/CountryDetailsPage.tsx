import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router';
import type { Country } from "../../core/models/Country";

const CountryDetailsPage: React.FC = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setCountry(null);
    setError(null);
    setBorderCountries([]);
    if (!code) {
      setError("No country code specified.");
      setLoading(false);
      return;
    }
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data[0]) {
          const c: Country = {
            name: data[0].name?.common ?? data[0].name,
            flag: data[0].flags?.svg ?? data[0].flags?.png ?? "",
            region: data[0].region ?? "",
            population: data[0].population ?? 0,
            cca3: data[0].cca3,
          };
          setCountry(c);
          // Fetch bordering countries
          if (Array.isArray(data[0].borders) && data[0].borders.length) {
            fetch(`https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(",")}`)
              .then((res) => res.json())
              .then((borderData) => {
                if (!cancelled && Array.isArray(borderData)) {
                  setBorderCountries(
                    borderData.map((b: any) => ({
                      name: b.name?.common ?? b.name,
                      flag: b.flags?.svg ?? b.flags?.png ?? "",
                      region: b.region ?? "",
                      population: b.population ?? 0,
                      cca3: b.cca3,
                    }))
                  );
                }
              });
          }
        } else if (!cancelled) {
          setError("Country not found.");
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to fetch country data.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  if (loading) return <main>Loading country…</main>;
  if (error) return <main>{error}</main>;
  if (!country) return null;

  return (
    <main>
      <div>
        <img src={country.flag} alt={`${country.name} flag`} />
        <div>
          <h2>{country.name}</h2>
          <div>Region: <span>{country.region}</span></div>
          <div>Population: <span>{country.population.toLocaleString()}</span></div>
          <div>Code: <span>{country.cca3}</span></div>
          {borderCountries.length > 0 && (
            <div>
              <div>Bordering Countries:</div>
              <div>
                {borderCountries.map((b) => (
                  <Link
                    key={b.cca3}
                    to={`/country/${b.cca3}`}
                  >
                    <span>{b.cca3}</span> {b.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <button onClick={() => navigate('/')}>Back to Dashboard</button>
      </div>
    </main>
  );
};

export default CountryDetailsPage;