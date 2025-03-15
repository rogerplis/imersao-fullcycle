import Categories from "./components/CategoriesList";
import Products from "./components/ProdutoList";

const Produtos = () => {
  return (
    <div className="flex gap-4 mt-4 ml-3 mr-1 md:flex-row flex-col">
      <div className="w-[250px] border h-screen p-1 hidden md:block ">
        <Categories />
      </div>
      <div className="flex-1 border h-screen ">
        <Products />
      </div>
    </div>
  );
}

export default Produtos;
