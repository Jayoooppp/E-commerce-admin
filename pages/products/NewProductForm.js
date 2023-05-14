import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
const NewProductForm = ({ productInfo }) => {
    const router = useRouter();
    const [formData, setFormData] = useState(productInfo || {
        title: "",
        description: "",
        price: ""
    })
    const [goBack, setGoBack] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (productInfo._id) {
            // update the product
            await axios.put("/api/products", { ...formData, id: productInfo._id }).then((res) => {
                console.log(res)
            })
        } else {
            await axios.post("/api/products", formData).then((res) => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })

        }
        setGoBack(true)

    }
    if (goBack) {
        router.push("/products")
    }
    return (

        <form onSubmit={handleSubmit}>

            <label>Product Name:</label>
            <input type="text" placeholder="Product Name" name="title" value={formData.title} onChange={handleChange} />
            <label>Description</label>
            <textarea placeholder="description" name="description" value={formData.description} onChange={handleChange}></textarea>
            <label>Price (in INR)</label>
            <input type="number" placeholder="price" name="price" value={formData.price} onChange={handleChange} />
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}

export default NewProductForm;