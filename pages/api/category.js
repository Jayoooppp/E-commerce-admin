import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
    await mongooseConnect();
    const { method } = req;
    if (method === "POST") {
        const { name, parentCategory } = req.body;
        let categoryDoc;
        if (parentCategory !== "") {
            categoryDoc = await Category.create({ name, parent: parentCategory });
        } else {
            categoryDoc = await Category.create({ name });

        }
        return res.status(200).json(categoryDoc);
    }

    if (method === "PUT") {
        const { name, parentCategory, _id } = req.body;
        console.log(req.body)
        let categoryDoc;
        if (parentCategory !== "") {
            categoryDoc = await Category.updateOne({ _id }, { name, parent: parentCategory });
        } else {
            categoryDoc = await Category.updateOne({ _id }, { name, parent: null });

        }
        return res.status(200).json(categoryDoc);
    }


    if (method === "GET") {
        const data = await Category.find().populate("parent");
        return res.json(data);
    }

}