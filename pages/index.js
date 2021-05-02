import Head from 'next/head'
import { useState, useEffect } from 'react';
import Product from '../components/Products/Products';
import Footer from '../components/Footer/Footer';

import {
  Heading,
  Box,
  Flex,
  Input,
  Stack,
  IconButton,
  useToast
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons"

export default function Home() {
  const [products, setProducts] = useState("");
  const [search, setSearch] = useState("");
  const [actualPage, setActualPage] = useState(1);
  const toast = useToast();

  useEffect(() => {
    suggestedProducts(actualPage);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await fetch("/api/SearchProducts", {
      method: "post",
      body: search,
    });

    const { products, error } = await results.json();

    if (error) {
      toast({
        position: "bottom",
        title: "An error ocurred",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setProducts(products);
    }
  }

  const suggestedProducts = async (actualPage) => {
    const results = await fetch("/api/GetProducts", {
      method: "post",
      body: actualPage,
    });

    const { products, error } = await results.json();
    if (error) {
      toast({
        position: "bottom",
        title: "An error ocurred",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setProducts(products);
    }
  }

  const handlePagination = (offset) => {
    if (offset === "+") {
      setActualPage(actualPage + 1);
      suggestedProducts(actualPage + 1);
    }
    if (offset === "-") {
      setActualPage(actualPage - 1);
      suggestedProducts(actualPage - 1);
    }
  };

  return (
    <Flex direction="column" justify="center" align="center">
      <Head>
        <title>Learning stuff</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box mb={4} flexDirection="column" justify="center" align="center" py={8}>
        <Heading as="h1" size="2xl" mb={8}>
          No covid shopping spot
          </Heading>
        <form onSubmit={handleSearch}>
          <Stack maxWidth="350px" width="100%" isInline mb={8}>
            <Input
              placeholder="Search for a product"
              value={search}
              border="none"
              onChange={(e) => setSearch(e.target.value)}
            />

            <IconButton
              colorScheme="blue"
              aria-label="Search Database"
              icon={<SearchIcon />}
              disabled={search === ""}
              type="submit" />

            <IconButton 
            colorScheme="red"
              aria-label="Reset Button"
              icon={<CloseIcon />}
              disabled={search === ""}
              onClick={async () => {
                setSearch("");
                suggestedProducts();
              }} />
          </Stack>
        </form>
        {products && <Product products={products} />}
      </Box>

      <section className="pagination-wrapper">
        <button onClick={() => handlePagination("-")}>{"<"}</button>
        <span>{actualPage}</span>
        <button onClick={() => handlePagination("+")}>{">"}</button>
      </section>

      <Footer />
    </Flex>
  )
}
