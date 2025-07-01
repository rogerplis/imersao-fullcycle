'use client'
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductResponse, Category } from "@/types/productType";
import { getCookie } from "cookies-next";
import { baseUrl } from "@/lib/utils";

interface ProductsProps {
    selectedCategories: number[];
    categories: Category[]; // Recebe categorias como prop
}

const Products: React.FC<ProductsProps> = ({ selectedCategories, categories }) => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const jwt = getCookie("access_token");

    useEffect(() => {
        const selectedCategoryNames = selectedCategories.map(id => {
            const category = categories.find(cat => cat.id === id);
            return category ? category.name : '';
        }).filter(name => name !== ''); // Filtra nomes vazios

        const categoryParams = selectedCategoryNames.length > 0
            ? `?categoryNames=${selectedCategoryNames.join(',')}`
            : '';

        const fetchUrl = `${baseUrl}/products/all${categoryParams}`;
        

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then(response => {
                console.log("ProductList - API Response Status:", response.status);
                if (response.status === 204) {
                    return null; 
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setProducts(data || []);
                if (data) {
                    console.log("ProductList - Products fetched:", data);
                } else {
                    console.log("ProductList - No products found (204).");
                }
            })
            .catch(error => {
                console.error("ProductList - Error fetching products:", error);
                setProducts([]);
            });
    }, [jwt, selectedCategories, categories]); // Adicionado 'categories' como dependência

    return (
        <div>            
            <p>Veja nossos produtos</p>
            {products.length === 0 && (
                <p className="text-red-500">Nenhum produto encontrado para as categorias selecionadas.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Products;
