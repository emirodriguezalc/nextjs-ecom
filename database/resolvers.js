import { Product } from "./models/Product";

export const resolvers = {
    Query: {
        getProducts: () => Product.find(),
    },
    Mutation: {
        registerProduct: (_, {name, price, description, img}) => {
            const product = new Product({name, price, description, img});
            return product.save();
        }
    }
};