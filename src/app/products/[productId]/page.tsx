
import { ProductResponse } from "@/types/productType";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import ProductImageCarousel from "../components/ProductImageCarousel";
import { API_ENDPOINTS } from "@/lib/api"; // Importar API_ENDPOINTS

async function getProduct(sku: string) {
  const url = API_ENDPOINTS.PRODUCT_FIND_BY_SKU(sku); // Usar constante de endpoint
  const cookieStore = cookies();
  const jwt = cookieStore.get("access_token")?.value;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (jwt) {
    headers["Authorization"] = `Bearer ${jwt}`;
  }
  if (!sku) {
    return undefined;
  }
  console.log("Fetching product with URL:", url);
  const response = await fetch(url, { next: { revalidate: 3600 }, headers });

  if (!response.ok) {
    return undefined;
  }

  return response.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const product: ProductResponse = await getProduct(params.productId);

  if (!product) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ProductImageCarousel images={product.images} />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-500 mb-4">R$ {product.price}</p>
          <div className="mb-4 max-h-48 overflow-y-auto hide-scrollbar">
            <p dangerouslySetInnerHTML={{ __html: product.description }}></p>
          </div>
          <div className="flex items-center mb-4">
            <span className="font-bold mr-2">Categoria:</span>
            <span>{product.categories.map((c) => c.name).join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
