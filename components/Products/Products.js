import React from "react";
import Image from "next/image";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";

const Product = ({ products }) => {
    return (
        <SimpleGrid columns={[1, 2, 3]} spacing="40px">
            {
                products.map((product) => {
                    return (
                        <div key={product.id}>
                            <Image src={product.image} width={300} height={300} />
                            <Heading as="h4" align="center" size="md">
                                {product.name}
                            </Heading>
                        </div>
                    )

                })
            }
        </SimpleGrid>
    )
}

export default Product;