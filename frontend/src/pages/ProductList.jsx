import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiClient from '../services/api';
import SidebarFilter from '../components/SidebarFilter';
import ProductCard from '../components/ProductCard';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rating: searchParams.get('rating') || '',
    sortBy: searchParams.get('sortBy') || 'newest',
  });

  useEffect(() => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.category) params.category = filters.category;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.rating) params.rating = filters.rating;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (page > 1) params.page = page;
    setSearchParams(params);
  }, [filters, page, setSearchParams]);

  useEffect(() => {
    apiClient.get('/products/categories')
      .then(res => setCategories(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page, limit: 12, sortBy: filters.sortBy });
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.rating) params.append('rating', filters.rating);

        const res = await apiClient.get(`/products?${params}`);
        setProducts(res.data.products || res.data || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalCount(res.data.total || products.length || 0);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters, page]);

  const handleClearFilters = () => {
    setFilters({ search: '', category: '', minPrice: '', maxPrice: '', rating: '', sortBy: 'newest' });
    setPage(1);
  };

  const activeFilterCount = [filters.category, filters.minPrice, filters.maxPrice, filters.rating].filter(Boolean).length;

  return (
    <div className="pl">
      {/* Header */}
      <div className="pl__header">
        <div className="container">
          <div className="pl__header-inner">
            <div>
              <h1 className="pl__title">
                {filters.search ? `Results for "${filters.search}"` : 'All Products'}
              </h1>
              <p className="pl__subtitle">
                {loading ? 'Loading...' : `${totalCount || products.length} products found`}
              </p>
            </div>
            <div className="pl__controls">
              <button 
                className={`pl__filter-toggle ${activeFilterCount > 0 ? 'pl__filter-toggle--active' : ''}`}
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                Filters
                {activeFilterCount > 0 && <span className="pl__filter-count">{activeFilterCount}</span>}
              </button>
              <div className="pl__sort">
                <select 
                  value={filters.sortBy} 
                  onChange={(e) => { setFilters({...filters, sortBy: e.target.value}); setPage(1); }}
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container">
        <div className="pl__layout">
          {/* Sidebar */}
          <aside className={`pl__sidebar ${filtersOpen ? 'pl__sidebar--open' : ''}`}>
            <SidebarFilter 
              filters={filters} 
              setFilters={(f) => { setFilters(f); setPage(1); }} 
              categories={categories}
              onClear={handleClearFilters}
            />
          </aside>

          {/* Mobile overlay */}
          {filtersOpen && <div className="pl__overlay" onClick={() => setFiltersOpen(false)} />}

          {/* Grid */}
          <main className="pl__main">
            {loading ? (
              <div className="pl__skeleton-grid">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="pl__skeleton-card">
                    <div className="skeleton" style={{ paddingTop: '100%' }} />
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div className="skeleton" style={{ height: 12, width: '40%' }} />
                      <div className="skeleton" style={{ height: 16, width: '80%' }} />
                      <div className="skeleton" style={{ height: 12, width: '60%' }} />
                      <div className="skeleton" style={{ height: 20, width: '30%', marginTop: 8 }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="pl__grid">
                  {products.map((product, i) => (
                    <div key={product.id} className="pl__grid-item fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pl__pagination">
                    <button 
                      disabled={page === 1} 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      className="pl__page-btn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                      Previous
                    </button>

                    <div className="pl__page-numbers">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) pageNum = i + 1;
                        else if (page <= 3) pageNum = i + 1;
                        else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                        else pageNum = page - 2 + i;
                        return (
                          <button
                            key={pageNum}
                            className={`pl__page-num ${page === pageNum ? 'pl__page-num--active' : ''}`}
                            onClick={() => setPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button 
                      disabled={page === totalPages} 
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      className="pl__page-btn"
                    >
                      Next
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="pl__empty">
                <div className="pl__empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term</p>
                <button className="btn-primary" onClick={handleClearFilters}>Clear All Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
