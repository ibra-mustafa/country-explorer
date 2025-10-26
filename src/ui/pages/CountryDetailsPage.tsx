import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router';
import type { Country } from "../../core/models/Country";
import FavoriteButton from "../components/FavoriteButton";

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
    <main className="container">
      <div style={{ 
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <img 
            src={country.flag} 
            alt={`${country.name} flag`} 
            style={{ 
              width: '100%',
              height: 'auto',
              borderRadius: '4px'
            }}
          />
          <div style={{ 
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255,255,255,0.9)',
            padding: '8px',
            borderRadius: '50%'
          }}>
            <FavoriteButton country={country} />
          </div>
        </div>
        <div>
          <h2 style={{ 
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>{country.name}</h2>
          <div style={{ marginBottom: '8px' }}>Region: <span>{country.region}</span></div>
          <div style={{ marginBottom: '8px' }}>Population: <span>{country.population.toLocaleString()}</span></div>
          <div style={{ marginBottom: '16px' }}>Code: <span>{country.cca3}</span></div>
          {borderCountries.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <div style={{ 
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '12px'
              }}>Bordering Countries:</div>
              <div style={{ 
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {borderCountries.map((b) => (
                  <Link
                    key={b.cca3}
                    to={`/country/${b.cca3}`}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <span style={{ color: '#666' }}>{b.cca3}</span> {b.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ 
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </main>
  );
};

export default CountryDetailsPage;