import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Products";
import { ObjectId } from "mongodb";
import { isAdminRequest } from "./auth/[...nextauth]";
export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res);

    if (method === "GET") {
        if (req.query?.id) {
            res.json(await Product.findById(req.query.id))
        } else {

            res.json(await Product.find());
        }
    }
    if (method === "POST") {
        const { title, description, price, images, category, properties } = req.body;

        const newProduct = await Product.create({
            title, description, price, images, category, properties
        })
        res.json(newProduct)
    }

    if (method === "PUT") {
        const { title, description, price, id, images, category, properties } = req.body;
        await Product.updateOne({ _id: id }, { title, description, price, images, category, properties });
        res.json(true);
    }

    if (method === "DELETE") {
        if (req.query?.id) {
            await Product.deleteOne({ _id: req.query.id });
            res.json(true);
        }
    }
}