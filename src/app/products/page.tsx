"use client";
import { useState } from "react";
import Categories from "./components/CategoriesList";
import Products from "./components/ProdutoList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/hooks/useCategories";

const Produtos = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const { categories, loading: loadingCategories, error: categoriesError } = useCategories();

  if (loadingCategories) {
    return <p>Carregando categorias...</p>;
  }

  if (categoriesError) {
    return <p className="text-red-500">Erro ao carregar categorias: {categoriesError}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <Link href="/products/manage/new">
          <Button>Novo Produto</Button>
        </Link>
      </div>
      <div className="flex gap-4 mt-4 ml-3 mr-1 md:flex-row flex-col">
        <div className="w-[250px] border h-screen p-1 hidden md:block ">
          <Categories
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="flex-1 border h-screen ">
          <Products categories={categories} selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default Produtos;

