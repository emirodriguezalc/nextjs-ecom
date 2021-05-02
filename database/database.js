import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from 'mongoose';
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";


const startServer = async () => {
    const app = express();

    const server = new ApolloServer({ typeDefs, resolvers });

    server.applyMiddleware({ app })

   await mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("Connected to Database");
        }).catch((err) => {
            console.log("Not Connected to Database ERROR! ", err);
        });

    app.listen({ port: 4000 }, () => {
        const url = `http://localhost:4000${server.graphqlPath}`;
        console.log(`🚀  Server ready at ${url}`);
    });
};

startServer();