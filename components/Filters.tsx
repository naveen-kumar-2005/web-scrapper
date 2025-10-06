import React from 'react';
import type { FilterOptions } from '../types';
import { Platform } from '../types';

interface FiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  allPlatforms: Platform[];
  productCount: number;
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters, allPlatforms, productCount }) => {
  const handlePlatformChange = (platform: Platform) => {
    setFilters(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }));
  };
  
  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3 border-b border-slate-600 pb-2">Filters</h3>
        <p className="text-sm text-slate-400">{productCount} products shown</p>
      </div>

      <div>
        <h4 className="font-semibold mb-2 text-slate-300">Platform</h4>
        <div className="space-y-2">
          {allPlatforms.map(platform => (
            <label key={platform} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded bg-slate-700 border-slate-500 text-cyan-500 focus:ring-cyan-600"
                checked={filters.platforms.includes(platform)}
                onChange={() => handlePlatformChange(platform)}
              />
              <span>{platform}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="price" className="block font-semibold mb-2 text-slate-300">
          Max Price: <span className="text-cyan-400 font-bold">₹{filters.maxPrice.toLocaleString('en-IN')}</span>
        </label>
        <input
          id="price"
          type="range"
          min="0"
          max="200000"
          step="5000"
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
      </div>

      <div>
        <label htmlFor="rating" className="block font-semibold mb-2 text-slate-300">
          Minimum Rating
        </label>
        <select
          id="rating"
          value={filters.minRating}
          onChange={handleRatingChange}
          className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="0">All Ratings</option>
          <option value="4">4 stars & up</option>
          <option value="3">3 stars & up</option>
          <option value="2">2 stars & up</option>
          <option value="1">1 star & up</option>
        </select>
      </div>
    </div>
  );
};