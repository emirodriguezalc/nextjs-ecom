import Head from 'next/head'
import { useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from '../styles/Home.module.css';
import Product from '../components/Products';
import {
  Heading,
  Box,
  Flex,
  Input,
  Stack,
  IconButton,
  useToast
} from "@chakra-ui/react";

export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters);
  console.log(initialState)
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
        <Product products={characters} />
      </Box>
      <footer className={styles.footer}>
        This is a footer
      </footer>
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
      characters: data.characters.results,
    },
  }
}
