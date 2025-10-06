
import type { Product } from '../types';

export const exportToCSV = (products: Product[], filename: string) => {
  if (products.length === 0) {
    return;
  }

  const headers = [
    'ID', 'Platform', 'Title', 'Price', 'Currency', 'Rating', 'Review Count',
    'Product URL', 'Image URL', 'Available'
  ];

  const rows = products.map(p => [
    p.id,
    p.platform,
    `"${p.title.replace(/"/g, '""')}"`, // Escape double quotes
    p.price,
    p.currency,
    p.rating,
    p.reviewCount,
    p.productUrl,
    p.imageUrl,
    p.isAvailable,
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
