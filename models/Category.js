import mongoose, { models } from "mongoose"
const categorySchema = new mongoose.Schema({
    name: { type: String, require: true },
    parent: { type: mongoose.Types.ObjectId, ref: 'Category' }
})

export const Category = models?.Category || mongoose.model("Category", categorySchema);