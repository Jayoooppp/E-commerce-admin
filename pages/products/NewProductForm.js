import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import UploadIcon from "@heroicons/react/24/outline/ArrowUpOnSquareIcon"
import Spinner from "@/components/Spinner";
const NewProductForm = ({ productInfo }) => {
    const router = useRouter();
    const [formData, setFormData] = useState(productInfo || {
        title: "",
        description: "",
        price: "",
        images: ""
    })
    const [goBack, setGoBack] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (productInfo?._id) {
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

    const uploadImage = async (img) => {
        const files = img.target?.files;
        const data = new FormData();
        data.append('upload_preset', "uukphioq");
        data.append("cloud_name", "dicpnxb4y");
        const links = []
        if (files?.length > 0) {
            setIsUploading(true)
            for (const file of files) {
                data.append("file", file)
                await axios.post("https://api.cloudinary.com/v1_1/dicpnxb4y/image/upload", data)
                    .then((res) => {
                        links.push(res.data.url)

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            setFormData({ ...formData, images: [...formData.images, ...links] })
            setIsUploading(false)
        }
    }


    if (goBack) {
        router.push("/products")
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Product Name:</label>
            <input type="text" placeholder="Product Name" name="title" value={formData.title} onChange={handleChange} />
            <label>Photos</label>
            <div className="mb-2 flex flex-wrap gap-2">
                {!!formData.images?.length && formData.images?.map((img) => (
                    <div key={img} className="h-24">
                        <img src={img} alt="" className="rounded-lg" />
                    </div>
                ))}
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="cursor-pointer w-24 h-24 border flex items-center text-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
                    <input type="file" className="hidden" onChange={uploadImage} multiple={true} />
                    < UploadIcon className="h-5 w-5" />Upload
                </label>


            </div>
            <label>Description</label>
            <textarea textarea placeholder="description" name="description" value={formData.description} onChange={handleChange}></textarea>
            <label>Price (in INR)</label>
            <input type="number" placeholder="price" name="price" value={formData.price} onChange={handleChange} />
            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}

export default NewProductForm;