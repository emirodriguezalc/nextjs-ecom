
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

export default async (req, res) => {
  const actualPage = req.body;
  try {
    const { data } = await client.query({
      query: gql`    
      query {
        characters(page: ${actualPage}) {
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
    res.status(200).json({ products: data.characters.results, error: null });
  } catch (error) {
    if (error.message === "404: Not Found") {
      res.status(404).json({ products: null, error: "No Characters found" });
    } else {
      res
        .status(500)
        .json({ products: null, error: "Internal Error, Please try again" });
    }
  }
};