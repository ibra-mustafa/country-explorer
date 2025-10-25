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
    <main className="max-w-[1000px] mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          className="border rounded px-3 py-2 w-full sm:w-1/2"
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border rounded px-3 py-2 w-full sm:w-1/4"
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
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Loading countries…
        </p>
      )}
      {error && <p className="text-sm text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {countries.map((c: Country) => (
            <CountryCard key={c.cca3 ?? c.name} country={c} />
          ))}
        </div>
      )}
      {!loading && hasMore && (
        <div className="text-center py-6 text-gray-500">Loading more…</div>
      )}
      {!loading && !hasMore && countries.length > 0 && (
        <div className="text-center py-6 text-gray-400 text-xs">
          End of results
        </div>
      )}
    </main>
  );
};

export default HomePage;
