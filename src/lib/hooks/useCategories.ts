'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/types/productType';
import { API_ENDPOINTS } from '@/lib/api'; // Importar API_ENDPOINTS
import { getCookie } from 'cookies-next';

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const useCategories = (): UseCategoriesResult => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const jwt = getCookie("access_token");
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
        if (jwt) {
          headers["Authorization"] = `Bearer ${jwt}`;
        }
        const response = await fetch(API_ENDPOINTS.CATEGORIES, { headers }); // Usar constante de endpoint
        if (response.ok) {
          const data: Category[] = await response.json();
          setCategories(data);
        } else {
          const errorText = await response.text();
          setError(`Failed to fetch categories: ${response.status} ${response.statusText} - ${errorText}`);
          console.error("Failed to fetch categories:", response.status, response.statusText, errorText);
        }
      } catch (err) {
        setError(`Error fetching categories: ${(err as Error).message}`);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading, error };
};

