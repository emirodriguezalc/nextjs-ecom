
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql/",
    cache: new InMemoryCache(),
});

export default async (req, res) => {
    try {
        const { data } = await client.query({
            query: gql`    
      query {
        getProducts{
            id
            name
            price
            description
            img
          }
      }
      `,
        });
        res.status(200).json({ products: data.getProducts, error: null });
        console.log(
            data
        );
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