import Head from 'next/head'
import { useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
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
import {SearchIcon, CloseIcon} from "@chakra-ui/icons"

export default function Home(results) {
  const initialState = results;
  const [products, setProducts] = useState(initialState.products);
  const [search, setSearch] = useState("");
  const toast = useToast();
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
          <form onSubmit={async (e) => {
            e.preventDefault();
            const results = await fetch("/api/SearchProducts",{
              method: "post",
              body: search,
            });
            const { products, error} = await results.json();
            if(error) {
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
          }}>
            <Stack maxWidth="350px" width="100%" isInline mb={8}>
              <Input placeholder="Search for a product" value={search} border="none" onChange={(e) => setSearch(e.target.value)}>
              </Input>
              <IconButton 
              colorScheme="blue" 
              aria-label="Search Database"
              icon={<SearchIcon />}
              disabled={search === ""}
              type="submit" />

              <IconButton colorScheme="red"
              aria-label="Reset Button"
              icon={<CloseIcon />}
              disabled={search === ""}
              onClick={async () => {
                setSearch("");
                setProducts(initialState.products);
              }}/>
              
            </Stack>
          </form>
        <Product products={products} />
      </Box>
      <Footer />
    </Flex>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
    query {
      characters(page: 1) {
        info {
          count
          pages
        }
        results {
          name
          id
          location {
            name
            id
          }
          image
          episode {
            id
            episode
            air_date
          }
        }
      }
    }
    `,
  });

  return {
    props: {
      products: data.characters.results,
    },
  }
}
