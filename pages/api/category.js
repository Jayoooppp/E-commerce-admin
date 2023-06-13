import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    await mongooseConnect();
    const { method } = req;

    await isAdminRequest(req, res);
    if (method === "POST") {
        const { name, parentCategory, properties } = req.body;
        let categoryDoc;
        if (parentCategory !== "") {
            categoryDoc = await Category.create({ name, parent: parentCategory, properties });
        } else {
            categoryDoc = await Category.create({ name, properties });

        }
        return res.status(200).json(categoryDoc);
    }

    if (method === "PUT") {
        const { name, parentCategory, _id, properties } = req.body;
        let categoryDoc;
        if (parentCategory !== "") {
            categoryDoc = await Category.updateOne({ _id }, { name, parent: parentCategory, properties });
        } else {
            categoryDoc = await Category.updateOne({ _id }, { name, parent: null, properties });

        }
        return res.status(200).json(categoryDoc);
    }

    if (method === "DELETE") {
        const { _id } = req.query;
        await Category.deleteOne({ _id })
        return res.status(203).json("Deleted!")
    }

    if (method === "GET") {
        const data = await Category.find().populate("parent");
        return res.json(data);
    }

}