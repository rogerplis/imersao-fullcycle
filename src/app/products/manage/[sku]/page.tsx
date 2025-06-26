import ProductForm from "@/app/products/components/ProductForm";
import { notFound, redirect } from "next/navigation";
import { ProductResponse } from "@/types/productType";
import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/lib/api"; // Importar API_ENDPOINTS

async function getProduct(sku: string): Promise<ProductResponse | undefined> {
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

  try {
    const response = await fetch(url, { next: { revalidate: 3600 }, headers });

    if (!response.ok) {
      return undefined;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching product for edit:", error);
    return undefined;
  }
}

export default async function EditProductPage({
  params,
}: {
  params: { sku: string };
}) {
  const product = await getProduct(params.sku);

  if (!product) {
    return notFound();
  }

  const handleSubmit = async (data: any) => {
    "use server";
    const cookieStore = cookies();
    const jwt = cookieStore.get("access_token")?.value;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (jwt) {
      headers["Authorization"] = `Bearer ${jwt}`;
    }

    const dataToSend = { ...data, categoriesId: data.categories };
    delete dataToSend.categories;

    const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(product.id), {
      method: "PUT", // Ou PATCH, dependendo da sua API
      headers,
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      redirect("/products");
    } else {
      console.error("Failed to update product:", response.status, response.statusText);
      // Tratar erro, talvez mostrar uma mensagem para o usuário
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Produto</h1>
      <ProductForm initialData={product} onSubmit={handleSubmit} />
    </div>
  );
}
