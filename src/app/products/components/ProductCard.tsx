import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ProductResponse } from "@/types/productType";
import Image from "next/image";
import Link from "next/link";
  

export type ProductCardProps = {
    product: ProductResponse
}

const ProductCard = (props: ProductCardProps) => {
    const imageCapa = props.product.images[0].url;

    return ( <Card className="w-full max-w-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg border">
        <div className="relative h-48 w-full">
            <Image
                src={imageCapa}
                alt={props.product.name}
                layout="fill"
                objectPosition="center"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
            />       

        </div>
        <CardHeader>
            <CardTitle className="text-lg font-semibold line-clamp-1">{props.product.name}</CardTitle>
            <CardDescription>{props.product.categories[0].name}</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm line-clamp-2">{props.product.categories[0].name}</p>
        </CardContent>
        <CardFooter>
            <Link href={`/products/${props.product.sku}`} className="w-full">
                <Button className="w-full">Veja os detalhes</Button>
            </Link>    
        </CardFooter>

    </Card> );
}
 
export default ProductCard;