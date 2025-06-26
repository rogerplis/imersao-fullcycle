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
        console.log("ProductList - Fetching URL:", fetchUrl);

        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then(response => {
                console.log("ProductList - API Response Status:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                console.log("ProductList - Products fetched:", data);
            })
            .catch(error => console.error("ProductList - Error fetching products:", error));
    }, [jwt, selectedCategories, categories]); // Adicionado 'categories' como dependência

    return (
        <div>
            <h1>Produtos</h1>
            <p>Veja nossos produtos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Products;
