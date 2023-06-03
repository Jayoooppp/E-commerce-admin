import mongoose, { model } from "mongoose";
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }]
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product; 