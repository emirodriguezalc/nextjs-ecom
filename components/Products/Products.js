import React from "react";
import Image from "next/image";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";

const Product = ({ products }) => {
    console.log(products);
    return (
        <SimpleGrid columns={[1, 2, 3]} spacing="40px">
            {
                products.map((product) => {
                    return (
                        <div key={product.id}>
                            {/*          <Image src={product.img} width={300} height={300} /> */}
                            <Image src={product.image} width={300} height={300} />
                            <Heading as="h4" align="center" size="md">
                                {product.name}{product.price && `€${product.price}`}
                            </Heading>
                            <Text as="h5" align="center" size="md">
                                {product.description}
                            </Text>
                        </div>
                    )
                })
            }
        </SimpleGrid>
    )
}

export default Product;