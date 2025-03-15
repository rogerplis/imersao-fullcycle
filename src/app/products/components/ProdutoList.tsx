"use client"
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductResponse } from "@/types/productType";
import { getCookie } from "cookies-next";

const Products = () => {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const jwt = getCookie("access_token");

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/products/all", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error));
    }, [jwt]);
    console.log(products);
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
