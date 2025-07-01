import { Category } from "@/types/productType";
import { useEffect, useState } from "react";

interface CategoriesProps {
    categories: Category[]; // Recebe categorias como prop
    selectedCategories: number[];
    setSelectedCategories: (categories: number[]) => void;
}

const Categories: React.FC<CategoriesProps> = ({ categories, selectedCategories, setSelectedCategories }) => {
    const handleCategoryChange = (categoryId: number) => {
        const newSelectedCategories = selectedCategories.includes(categoryId)
            ? selectedCategories.filter(id => id !== categoryId)
            : [...selectedCategories, categoryId];
        setSelectedCategories(newSelectedCategories);
    };

    return (
        <div>
            <h2 className="text-1xl font-bold mb-4 m-auto">Filtre por Categoria</h2>
            <ul>
                {categories?.map(category => (
                    <li key={category.id} className="m-2 text-lg font-bold gap-2 flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCategoryChange(category.id)}
                        />
                        
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;