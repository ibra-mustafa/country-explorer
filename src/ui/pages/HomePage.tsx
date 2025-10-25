import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import { RestCountriesApi } from "../../infrastructure/restCountriesApi/RestCountriesApi";
import { fetchCountries } from "../../core/usecases/fetchCountries";
import type { Country } from "../../core/models/Country";
const repo = new RestCountriesApi();

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const PAGE_SIZE = 24;

const HomePage: React.FC = () => {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch all countries once
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCountries(repo)
      .then((data) => {
        if (!cancelled) {
          setAllCountries(data);
          setPage(1);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = allCountries;
    if (region) filtered = filtered.filter((c: Country) => c.region === region);
    if (search)
      filtered = filtered.filter((c: Country) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    setCountries(filtered.slice(0, page * PAGE_SIZE));
    setHasMore(filtered.length > page * PAGE_SIZE);
  }, [allCountries, search, region, page]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setPage((p: number) => (hasMore ? p + 1 : p));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMore, loading]);

  return (
    <div className="country-grid">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      {loading && (
        <p>Loading countries…</p>
      )}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <div className="grid">
          {countries.map((c: Country) => (
            <CountryCard key={c.cca3 ?? c.name} country={c} />
          ))}
        </div>
      )}
      {!loading && hasMore && (
        <div className="loading">Loading more…</div>
      )}
      {!loading && !hasMore && countries.length > 0 && (
        <div className="end-message">End of results</div>
      )}
    </div>
  );
};

export default HomePage;
