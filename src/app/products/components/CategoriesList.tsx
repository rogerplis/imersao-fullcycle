"use client"
import { Category } from "@/types/productType";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const Categories = () => {
    const [categories, setCategories] = useState<Category[] | null>([]);
     // Recupera o JWT dos cookies
      const jwt = getCookie("access_token");

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/categories/", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.log(error));
    }, [jwt]);
console.log(categories);

    return (<div>
        <h1 className="text-2xl font-bold mb-4 m-auto">Categorias</h1>
        <ul>
            {categories?.map(category => (
                <li key={category.id} className="m-2 text-lg font-bold">{category.name}</li>
            ))}
        </ul>
    </div>  );
}
 
export default Categories;