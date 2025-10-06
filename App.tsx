import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { DataTable } from './components/DataTable';
import { Loader } from './components/Loader';
import type { Product, FilterOptions, SortOptions } from './types';
import { Platform } from './types';
import { fetchScrapedData } from './services/geminiService';
import { exportToCSV } from './utils/csvExporter';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('gaming laptop');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    platforms: [],
    minPrice: 0,
    maxPrice: 200000,
    minRating: 0,
  });
  const [sort, setSort] = useState<SortOptions>({ key: 'rating', direction: 'desc' });
  
  const allPlatforms = useMemo(() => Object.values(Platform), []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query) return;
    setIsLoading(true);
    setError(null);
    setProducts([]);
    setFilteredProducts([]);
    try {
      const data = await fetchScrapedData(query);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial search on component mount
    handleSearch(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let processedProducts = [...products];

    // Filtering
    processedProducts = processedProducts.filter(p => {
      const platformMatch = filters.platforms.length === 0 || filters.platforms.includes(p.platform);
      const priceMatch = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const ratingMatch = p.rating >= filters.minRating;
      return platformMatch && priceMatch && ratingMatch;
    });

    // Sorting
    processedProducts.sort((a, b) => {
      const aValue = a[sort.key];
      const bValue = b[sort.key];
      
      if (aValue < bValue) {
        return sort.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sort.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredProducts(processedProducts);
  }, [products, filters, sort]);

  const handleExport = () => {
    if (filteredProducts.length > 0) {
      exportToCSV(filteredProducts, `products_${searchQuery.replace(/\s/g, '_')}.csv`);
    } else {
      alert("No data to export.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            AI Web Scraper Dashboard
          </h1>
          <p className="text-slate-400 mt-2">Enter a product to scrape data from multiple e-commerce sites.</p>
        </header>

        <main>
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-700">
            <SearchBar 
              initialQuery={searchQuery}
              onSearch={handleSearch} 
              isLoading={isLoading} 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
            <aside className="lg:col-span-1">
              <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700 sticky top-8">
                <Filters 
                  filters={filters}
                  setFilters={setFilters}
                  allPlatforms={allPlatforms}
                  productCount={filteredProducts.length}
                />
              </div>
            </aside>

            <section className="lg:col-span-3">
              <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-slate-100">
                    {isLoading ? 'Fetching Results...' : `Found ${filteredProducts.length} Products`}
                  </h2>
                  <button
                    onClick={handleExport}
                    disabled={filteredProducts.length === 0 || isLoading}
                    className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Export CSV
                  </button>
                </div>
                
                {isLoading && (
                  <div className="flex justify-center items-center h-96">
                    <Loader />
                  </div>
                )}
                
                {error && (
                  <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md text-center">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                  </div>
                )}
                
                {!isLoading && !error && (
                  <DataTable products={filteredProducts} sort={sort} setSort={setSort} />
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;