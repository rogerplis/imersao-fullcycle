export interface Product {
    name: string
    price: number
    description: string
    sku: string
    brand: string
    model: string
    color: string
    size: string
    gender: string
    status: string
    type: string
    netWeight: number
    grossWeight: number
    weightUnit: string
    measurementUnit: string
    length: number
    width: number
    height: number
    volume: number
    categories: number[]
    images: Image[]
    attributes: Attribute[]
    variations: Variation[]
    regulations: Regulation[]
    composedProducts: ComposedProduct[]
  }
  
  export interface Image {
    url: string
    alt: string
    position: number
  }
  
  export interface Attribute {
    name: string
    value: string
    unit: string
  }
  
  export interface Variation {
    sku: string
    status: string
    attributes: Attribute[]
  }
  
  
  
  export interface Regulation {
    name: string
    value: string
  }

  export interface Category {
    id: number
    name: string
  }

  export interface ComposedProduct {
    id: number
    name: string
    price: number
    quantity: number
  }

  export interface ProductResponse{
    id: number
    name: string
    price: number
    description: string
    sku: string
    brand: string
    model: string
    color: string
    size: string
    gender: string
    status: string
    type: string
    netWeight: number
    grossWeight: number
    weightUnit: string
    measurementUnit: string
    length: number
    width: number
    height: number
    volume: number
    categories: Category[]
    images: Image[]
    composedProducts: ComposedProduct[]
    
  }
  