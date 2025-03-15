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
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
            />       

        </div>
        <CardHeader>
            <CardTitle className="text-lg font-semibold line-clamp-1">{props.product.name}</CardTitle>
            <CardDescription>{props.product.description}</CardDescription>
        </CardHeader>
        <CardContent>
            {props.product.attributes.map((attribute) => {
                return (
                    <div key={attribute.name}>
                        {attribute.name}: {attribute.value}
                    </div>
                    )
                })

            }
        </CardContent>
        <CardFooter>
            <Button className="w-full">Veja os detalhes</Button>    
        </CardFooter>

    </Card> );
}
 
export default ProductCard;