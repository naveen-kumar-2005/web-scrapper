
import React from 'react';
import type { Product, SortOptions } from '../types';
import { Platform } from '../types';
import { PlatformIcon } from './PlatformIcon';

interface DataTableProps {
  products: Product[];
  sort: SortOptions;
  setSort: React.Dispatch<React.SetStateAction<SortOptions>>;
}

const SortableHeader: React.FC<{
    label: string;
    sortKey: SortOptions['key'];
    sort: SortOptions;
    setSort: React.Dispatch<React.SetStateAction<SortOptions>>;
}> = ({ label, sortKey, sort, setSort }) => {
    const isCurrentKey = sort.key === sortKey;
    const directionIcon = isCurrentKey ? (sort.direction === 'asc' ? '▲' : '▼') : '';

    const handleSort = () => {
        if (isCurrentKey) {
            setSort({ key: sortKey, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
        } else {
            setSort({ key: sortKey, direction: 'desc' });
        }
    };
    
    return (
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
            <button onClick={handleSort} className="flex items-center gap-1 hover:text-white">
                {label}
                <span className="text-cyan-400 w-2">{directionIcon}</span>
            </button>
        </th>
    );
};


const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <svg key={`full-${i}`} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
            {halfStar && <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
            {[...Array(emptyStars)].map((_, i) => (
                <svg key={`empty-${i}`} className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
        </div>
    );
};


export const DataTable: React.FC<DataTableProps> = ({ products, sort, setSort }) => {
  if (products.length === 0) {
    return (
        <div className="text-center py-16 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="mt-4 text-lg">No products found.</p>
            <p>Try adjusting your filters or searching for something else.</p>
        </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Product</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Platform</th>
            <SortableHeader label="Price" sortKey="price" sort={sort} setSort={setSort} />
            <SortableHeader label="Rating" sortKey="rating" sort={sort} setSort={setSort} />
            <SortableHeader label="Reviews" sortKey="reviewCount" sort={sort} setSort={setSort} />
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-slate-800/50 divide-y divide-slate-700">
          {products.map(product => (
            <tr key={product.id} className="hover:bg-slate-700/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12">
                    <img className="h-12 w-12 rounded-md object-cover" src={product.imageUrl} alt={product.title} />
                  </div>
                  <div className="ml-4">
                    <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-100 hover:text-cyan-400 line-clamp-2" style={{maxWidth: '300px'}}>
                      {product.title}
                    </a>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <PlatformIcon platform={product.platform} />
                  {product.platform}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300 font-semibold">{product.currency}{product.price.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <StarRating rating={product.rating} />
                    <span className="text-sm text-slate-400">{product.rating.toFixed(1)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{product.reviewCount.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.isAvailable ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-200">
                    In Stock
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-900 text-red-200">
                    Out of Stock
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
