'use client'

import { useState, useEffect } from 'react';
import { ProductResponse } from '@/types/productType';
import { baseUrl } from '@/lib/utils';
import { getCookie } from 'cookies-next';

interface ProductFilter {
    searchTerm?: string;
}

export const useProducts = (filter?: ProductFilter) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [allProducts, setAllProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const jwt = getCookie("access_token");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      let url = `${baseUrl}/products/all`;
      if (filter?.searchTerm) {
        const params = new URLSearchParams();
        params.append('name', filter.searchTerm);
        params.append('sku', filter.searchTerm);
        url = `${url}?${params.toString()}`;
      }

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (response.status === 204) {
            setProducts([]);
            if (!filter?.searchTerm) {
                setAllProducts([]);
            }
            return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        if (!filter?.searchTerm) {
            setAllProducts(data);
        }
      } catch (error) {
        setError(error as Error);
        setProducts([]);
        if (!filter?.searchTerm) {
            setAllProducts([]);
        }
      } finally {
        setLoading(false);
      }
    };

    if (filter?.searchTerm) {
        const handler = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    } else {
        fetchProducts();
    }

  }, [filter?.searchTerm, jwt]);

  return { products, allProducts, loading, error };
};

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (response.status === 204) {
            setProducts([]);
            return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error as Error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (filter?.searchTerm) {
        const handler = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    } else {
        fetchProducts();
    }

  }, [filter?.searchTerm, jwt]);

  return { products, loading, error };
};
