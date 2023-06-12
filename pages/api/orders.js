import { mongooseConnect } from "@/lib/mongoose";
import Order from "@/models/Order";

export default async function handler(req, res) {
    await mongooseConnect();


    if (req.method === "GET") {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        return res.status(203).json(orders)
    }
}