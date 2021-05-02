import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Query {
    getProducts: [Product!]!
}

type Product {
    id: ID!
    name: String!
    price: Float!
    description: String!
    img: String!
}

type Mutation {
    registerProduct(name: String!,price: Float!,description: String!,img: String!): Product!
}
`;

