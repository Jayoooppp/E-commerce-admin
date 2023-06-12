import mongoose, { models } from "mongoose"
const orderSchema = new mongoose.Schema({
    line_items: Object,
    name: String,
    email: String,
    address: String,
    city: String,
    postalcode: String,
    country: String,
    paid: Boolean
}, {
    timestamps: true
}
)


const Order = models?.Order || mongoose.model("Order", orderSchema);
export default Order;
