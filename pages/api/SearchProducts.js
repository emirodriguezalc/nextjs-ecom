  
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://localhost:4000/graphql/",
  cache: new InMemoryCache(),
});

export default async (req, res) => {
  const search = req.body;
  try {
    const { data } = await client.query({
      query: gql`
        query {
          getProducts(filter: { name: "${search}" }) {
            id
            name
            price
            description
            img
          }
        }
      `,
    });
    console.log(res.json(), 'lalal');
    res.status(200).json({ products: data.getProducts, error: null });
  } catch (error) {
    if (error.message === "404: Not Found") {
      res.status(404).json({ products: null, error: "No Products found" });
    } else {
      res
        .status(500)
        .json({ products: null, error: "Internal Error, Please try again" });
    }
  }
};