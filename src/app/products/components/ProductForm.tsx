'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Category, ProductResponse, Image as ProductImage, Attribute, Regulation, Variation, Product } from "@/types/productType";
import { baseUrl } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCategories } from "@/lib/hooks/useCategories";

const imageSchema = z.object({
  url: z.string().url("URL de imagem inválida"),
  alt: z.string().optional(),
  position: z.coerce.number().optional(),
});

const attributeSchema = z.object({
  name: z.string().min(1, "Nome do atributo é obrigatório"),
  value: z.string().min(1, "Valor do atributo é obrigatório"),
  unit: z.string().optional(),
});

const regulationSchema = z.object({
  name: z.string().min(1, "Nome da regulamentação é obrigatório"),
  value: z.string().min(1, "Valor da regulamentação é obrigatório"),
});

const variationSchema = z.object({
  sku: z.string().min(1, "SKU da variação é obrigatório"),
  status: z.string().min(1, "Status da variação é obrigatório"),
  attributes: z.array(attributeSchema).optional(),
});

const productFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.coerce.number().min(0.01, "Preço deve ser maior que zero"),
  description: z.string().min(1, "Descrição é obrigatória"),
  sku: z.string().min(1, "SKU é obrigatório"),
  brand: z.string().min(1, "Marca é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  color: z.string().min(1, "Cor é obrigatória"),
  size: z.string().min(1, "Tamanho é obrigatório"),
  gender: z.string().min(1, "Gênero é obrigatório"),
  status: z.string().min(1, "Status é obrigatório"),
  type: z.string().min(1, "Tipo é obrigatório"),
  netWeight: z.coerce.number().min(0, "Peso líquido deve ser maior ou igual a zero"),
  grossWeight: z.coerce.number().min(0, "Peso bruto deve ser maior ou igual a zero"),
  weightUnit: z.string().min(1, "Unidade de peso é obrigatória"),
  measurementUnit: z.string().min(1, "Unidade de medida é obrigatória"),
  length: z.coerce.number().min(0, "Comprimento deve ser maior ou igual a zero"),
  width: z.coerce.number().min(0, "Largura deve ser maior ou igual a zero"),
  height: z.coerce.number().min(0, "Altura deve ser maior ou igual a zero"),
  volume: z.coerce.number().min(0, "Volume deve ser maior ou igual a zero"),
  categories: z.array(z.number()).min(1, "Selecione ao menos uma categoria"),
  images: z.array(imageSchema).min(1, "Adicione ao menos uma imagem"),
  attributes: z.array(attributeSchema).optional(),
  variations: z.array(variationSchema).optional(),
  regulations: z.array(regulationSchema).optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  initialData?: ProductResponse; // Para edição
  onSubmit: (data: ProductFormValues) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit }) => {
  const { categories, loading: loadingCategories, error: categoriesError } = useCategories();
  const [openCategorySelect, setOpenCategorySelect] = useState(false);

  const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      categories: initialData.categories.map(cat => cat.id),
      images: initialData.images.map(img => ({ url: img.url, alt: img.alt, position: img.position })),
      attributes: initialData.attributes || [],
      variations: initialData.variations || [],
      regulations: initialData.regulations || [],
    } : {
      // Default values for new product
      name: "", price: 0.01, description: "", sku: "", brand: "", model: "",
      color: "", size: "", gender: "", status: "", type: "",
      netWeight: 0, grossWeight: 0, weightUnit: "", measurementUnit: "",
      length: 0, width: 0, height: 0, volume: 0,
      categories: [],
      images: [{ url: "", alt: "", position: 0 }],
      attributes: [],
      variations: [],
      regulations: [],
    },
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: "images",
  });

  const { fields: attributeFields, append: appendAttribute, remove: removeAttribute } = useFieldArray({
    control,
    name: "attributes",
  });

  const { fields: regulationFields, append: appendRegulation, remove: removeRegulation } = useFieldArray({
    control,
    name: "regulations",
  });

  const { fields: variationFields, append: appendVariation, remove: removeVariation } = useFieldArray({
    control,
    name: "variations",
  });

  const watchedCategories = watch("categories");

  const handleCategorySelect = (categoryId: number) => {
    const currentCategories = watchedCategories || [];
    if (currentCategories.includes(categoryId)) {
      setValue("categories", currentCategories.filter((id) => id !== categoryId));
    } else {
      setValue("categories", [...currentCategories, categoryId]);
    }
  };

  const getCategoryName = (id: number) => {
    return categories.find(cat => cat.id === id)?.name || `ID: ${id}`;
  };

  const _onSubmit = async (data: ProductFormValues) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(_onSubmit)} className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="price">Preço</Label>
              <Input id="price" type="number" step="0.01" {...register("price")} />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" {...register("sku")} />
              {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" {...register("description")} />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Detalhes Adicionais */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="brand">Marca</Label>
              <Input id="brand" {...register("brand")} />
              {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
            </div>
            <div>
              <Label htmlFor="model">Modelo</Label>
              <Input id="model" {...register("model")} />
              {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
            </div>
            <div>
              <Label htmlFor="color">Cor</Label>
              <Input id="color" {...register("color")} />
              {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}
            </div>
            <div>
              <Label htmlFor="size">Tamanho</Label>
              <Input id="size" {...register("size")} />
              {errors.size && <p className="text-red-500 text-sm">{errors.size.message}</p>}
            </div>
            <div>
              <Label htmlFor="gender">Gênero</Label>
              <Input id="gender" {...register("gender")} />
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Input id="status" {...register("status")} />
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Input id="type" {...register("type")} />
              {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dimensões e Peso */}
      <Card>
        <CardHeader>
          <CardTitle>Dimensões e Peso</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="netWeight">Peso Líquido</Label>
            <Input id="netWeight" type="number" step="0.01" {...register("netWeight")} />
            {errors.netWeight && <p className="text-red-500 text-sm">{errors.netWeight.message}</p>}
          </div>
          <div>
            <Label htmlFor="grossWeight">Peso Bruto</Label>
            <Input id="grossWeight" type="number" step="0.01" {...register("grossWeight")} />
            {errors.grossWeight && <p className="text-red-500 text-sm">{errors.grossWeight.message}</p>}
          </div>
          <div>
            <Label htmlFor="weightUnit">Unidade de Peso</Label>
            <Input id="weightUnit" {...register("weightUnit")} />
            {errors.weightUnit && <p className="text-red-500 text-sm">{errors.weightUnit.message}</p>}
          </div>
          <div>
            <Label htmlFor="measurementUnit">Unidade de Medida</Label>
            <Input id="measurementUnit" {...register("measurementUnit")} />
            {errors.measurementUnit && <p className="text-red-500 text-sm">{errors.measurementUnit.message}</p>}
          </div>
          <div>
            <Label htmlFor="length">Comprimento</Label>
            <Input id="length" type="number" step="0.01" {...register("length")} />
            {errors.length && <p className="text-red-500 text-sm">{errors.length.message}</p>}
          </div>
          <div>
            <Label htmlFor="width">Largura</Label>
            <Input id="width" type="number" step="0.01" {...register("width")} />
            {errors.width && <p className="text-red-500 text-sm">{errors.width.message}</p>}
          </div>
          <div>
            <Label htmlFor="height">Altura</Label>
            <Input id="height" type="number" step="0.01" {...register("height")} />
            {errors.height && <p className="text-red-500 text-sm">{errors.height.message}</p>}
          </div>
          <div>
            <Label htmlFor="volume">Volume</Label>
            <Input id="volume" type="number" step="0.01" {...register("volume")} />
            {errors.volume && <p className="text-red-500 text-sm">{errors.volume.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Categorias e Imagens */}
      <Card>
        <CardHeader>
          <CardTitle>Categorias e Imagens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="categories">Categorias</Label>
            {loadingCategories ? (
              <p>Carregando categorias...</p>
            ) : (
              <Popover open={openCategorySelect} onOpenChange={setOpenCategorySelect}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCategorySelect}
                    className="w-full justify-between"
                  >
                    {watchedCategories && watchedCategories.length > 0
                      ? watchedCategories.map(getCategoryName).join(", ")
                      : "Selecione categorias..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar categoria..." />
                    <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.id}
                          value={category.name}
                          onSelect={() => {
                            handleCategorySelect(category.id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              watchedCategories?.includes(category.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {category.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {watchedCategories?.map((categoryId) => (
                <Badge key={categoryId} variant="secondary">
                  {getCategoryName(categoryId)}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => handleCategorySelect(categoryId)}
                  />
                </Badge>
              ))}
            </div>
            {errors.categories && <p className="text-red-500 text-sm">{errors.categories.message}</p>}
          </div>

          <div>
            <Label>Imagens</Label>
            {imageFields.map((field, index) => (
              <div key={field.id} className="flex space-x-2 mb-2">
                <Input
                  placeholder="URL da Imagem"
                  {...register(`images.${index}.url` as const)}
                />
                <Input
                  placeholder="Alt Text"
                  {...register(`images.${index}.alt` as const)}
                />
                <Input
                  placeholder="Posição"
                  type="number"
                  {...register(`images.${index}.position` as const, { valueAsNumber: true })}
                />
                <Button type="button" onClick={() => removeImage(index)} variant="destructive">
                  Remover
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendImage({ url: "", alt: "", position: 0 })} className="mt-2">
              Adicionar Imagem
            </Button>
            {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Atributos */}
      <Card>
        <CardHeader>
          <CardTitle>Atributos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {attributeFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 border p-2 rounded-md">
              <div>
                <Label htmlFor={`attributes.${index}.name`}>Nome</Label>
                <Input id={`attributes.${index}.name`} {...register(`attributes.${index}.name` as const)} />
                {errors.attributes?.[index]?.name && <p className="text-red-500 text-sm">{errors.attributes[index]?.name?.message}</p>}
              </div>
              <div>
                <Label htmlFor={`attributes.${index}.value`}>Valor</Label>
                <Input id={`attributes.${index}.value`} {...register(`attributes.${index}.value` as const)} />
                {errors.attributes?.[index]?.value && <p className="text-red-500 text-sm">{errors.attributes[index]?.value?.message}</p>}
              </div>
              <div>
                <Label htmlFor={`attributes.${index}.unit`}>Unidade</Label>
                <Input id={`attributes.${index}.unit`} {...register(`attributes.${index}.unit` as const)} />
                {errors.attributes?.[index]?.unit && <p className="text-red-500 text-sm">{errors.attributes[index]?.unit?.message}</p>}
              </div>
              <Button type="button" onClick={() => removeAttribute(index)} variant="destructive" className="col-span-full">
                Remover Atributo
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendAttribute({ name: "", value: "", unit: "" })} className="mt-2">
            Adicionar Atributo
          </Button>
          {errors.attributes && <p className="text-red-500 text-sm">{errors.attributes.message}</p>}
        </CardContent>
      </Card>

      {/* Regulamentações */}
      <Card>
        <CardHeader>
          <CardTitle>Regulamentações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {regulationFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-2 border p-2 rounded-md">
              <div>
                <Label htmlFor={`regulations.${index}.name`}>Nome</Label>
                <Input id={`regulations.${index}.name`} {...register(`regulations.${index}.name` as const)} />
                {errors.regulations?.[index]?.name && <p className="text-red-500 text-sm">{errors.regulations[index]?.name?.message}</p>}
              </div>
              <div>
                <Label htmlFor={`regulations.${index}.value`}>Valor</Label>
                <Input id={`regulations.${index}.value`} {...register(`regulations.${index}.value` as const)} />
                {errors.regulations?.[index]?.value && <p className="text-red-500 text-sm">{errors.regulations[index]?.value?.message}</p>}
              </div>
              <Button type="button" onClick={() => removeRegulation(index)} variant="destructive" className="col-span-full">
                Remover Regulamentação
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendRegulation({ name: "", value: "" })} className="mt-2">
            Adicionar Regulamentação
          </Button>
          {errors.regulations && <p className="text-red-500 text-sm">{errors.regulations.message}</p>}
        </CardContent>
      </Card>

      {/* Variações */}
      <Card>
        <CardHeader>
          <CardTitle>Variações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {variationFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-md space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <Label htmlFor={`variations.${index}.sku`}>SKU Variação</Label>
                  <Input id={`variations.${index}.sku`} {...register(`variations.${index}.sku` as const)} />
                  {errors.variations?.[index]?.sku && <p className="text-red-500 text-sm">{errors.variations[index]?.sku?.message}</p>}
                </div>
                <div>
                  <Label htmlFor={`variations.${index}.status`}>Status Variação</Label>
                  <Input id={`variations.${index}.status`} {...register(`variations.${index}.status` as const)} />
                  {errors.variations?.[index]?.status && <p className="text-red-500 text-sm">{errors.variations[index]?.status?.message}</p>}
                </div>
              </div>

              {/* Atributos da Variação */}
              <div className="ml-4 space-y-2">
                <h4 className="font-semibold">Atributos da Variação</h4>
                {field.attributes?.map((attr, attrIndex) => (
                  <div key={attrIndex} className="grid grid-cols-1 md:grid-cols-3 gap-2 border p-2 rounded-md">
                    <div>
                      <Label htmlFor={`variations.${index}.attributes.${attrIndex}.name`}>Nome</Label>
                      <Input id={`variations.${index}.attributes.${attrIndex}.name`} {...register(`variations.${index}.attributes.${attrIndex}.name` as const)} />
                    </div>
                    <div>
                      <Label htmlFor={`variations.${index}.attributes.${attrIndex}.value`}>Valor</Label>
                      <Input id={`variations.${index}.attributes.${attrIndex}.value`} {...register(`variations.${index}.attributes.${attrIndex}.value` as const)} />
                    </div>
                    <div>
                      <Label htmlFor={`variations.${index}.attributes.${attrIndex}.unit`}>Unidade</Label>
                      <Input id={`variations.${index}.attributes.${attrIndex}.unit`} {...register(`variations.${index}.attributes.${attrIndex}.unit` as const)} />
                    </div>
                    <Button
                      type="button"
                      onClick={() => {
                        const currentVariations = watch("variations");
                        const newAttributes = currentVariations[index].attributes?.filter((_, i) => i !== attrIndex);
                        setValue(`variations.${index}.attributes`, newAttributes);
                      }}
                      variant="destructive"
                      className="col-span-full"
                    >
                      Remover Atributo da Variação
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => {
                    const currentVariations = watch("variations");
                    const newAttributes = [...(currentVariations[index].attributes || []), { name: "", value: "", unit: "" }];
                    setValue(`variations.${index}.attributes`, newAttributes);
                  }}
                  className="mt-2"
                >
                  Adicionar Atributo à Variação
                </Button>
              </div>
              <Button type="button" onClick={() => removeVariation(index)} variant="destructive" className="w-full">
                Remover Variação
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendVariation({ sku: "", status: "", attributes: [] })} className="mt-2">
            Adicionar Variação
          </Button>
          {errors.variations && <p className="text-red-500 text-sm">{errors.variations.message}</p>}
        </CardContent>
      </Card>

      <Button type="submit">Salvar Produto</Button>
    </form>
  );
};

export default ProductForm;
