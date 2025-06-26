import { baseUrl } from "./utils";

export const API_ENDPOINTS = {
  PRODUCTS: `${baseUrl}/products/save`,
  PRODUCT_FIND_BY_SKU: (sku: string) => `${baseUrl}/products/find/${sku}`,
  PRODUCT_BY_ID: (id: number) => `${baseUrl}/products/${id}`,
  CATEGORIES: `${baseUrl}/categories/`,
};
