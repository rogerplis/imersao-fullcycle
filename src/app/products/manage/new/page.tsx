import ProductForm from "@/app/products/components/ProductForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/lib/api";

export default function NewProductPage() {
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

    const response = await fetch(API_ENDPOINTS.PRODUCTS, {
      method: "POST",
      headers,
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      redirect("/products");
    } else {
      console.error("Failed to create product:", response.status, response.statusText);
      // Tratar erro, talvez mostrar uma mensagem para o usuário
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Novo Produto</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
