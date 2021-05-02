import mongoose from 'mongoose';

export const Product = mongoose.model('Product', { name: String, price: Number, description: String, img: String });