import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UploadIcon from "@heroicons/react/24/outline/ArrowUpOnSquareIcon"
import Spinner from "@/components/Spinner";
import { Catamaran } from "next/font/google";
const NewProductForm = ({ productInfo }) => {
    const router = useRouter();
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState(productInfo || {
        title: "",
        description: "",
        price: "",
        images: "",
        category: "",
        properties: {}
    })
    const [goBack, setGoBack] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        axios.get("/api/category")
            .then((res) => {
                setCategories(res.data)
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (productInfo?._id) {
            // update the product
            await axios.put("/api/products", { ...formData, id: productInfo._id, properties: formData.properties }).then((res) => {
            })
        } else {
            await axios.post("/api/products", { ...formData, properties: formData.properties }).then((res) => {
            }).catch(err => {
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

    const propertiesToFill = [];
    if (categories.length > 0 && formData.category) {
        let catInfo = categories.find(({ _id }) => (
            _id === formData.category
        ))
        propertiesToFill.push(...catInfo.properties)
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id)
            propertiesToFill.push(...parentCat.properties)
            catInfo = parentCat;
        }
    }

    const handlePropertiesChange = (name, value) => {
        setFormData({ ...formData, properties: { ...formData.properties, [name]: value } })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Product Name:</label>
            <input type="text" placeholder="Product Name" name="title" value={formData.title} onChange={handleChange} />
            <label>Category</label>
            <select onChange={handleChange} name="category" value={formData.category}>
                <option value="">Uncategorized</option>
                {categories?.map((cat, i) => (
                    <option value={cat._id}>{cat.name}</option>
                ))}
            </select>
            {propertiesToFill.length > 0 && (
                propertiesToFill.map((property, i) => (
                    <div className="">
                        <label>{property.name[0].toUpperCase() + property.name.substring(1)}</label>
                        <div>
                            <select value={formData?.properties?.[property.name]} onChange={(e) => handlePropertiesChange(property.name, e.target.value)}>
                                {property.values.map((val) => (
                                    <option value={val} >{val}</option>
                                ))}
                            </select>

                        </div>
                    </div>
                ))
            )}
            <label>Photos</label>
            <div className="mb-2 flex flex-wrap gap-2">
                {!!formData.images?.length && formData.images?.map((img) => (
                    <div key={img} className="h-24 bg-white p-3 shadow-sm rounded-sm border border-gray-200">
                        <img src={img} alt="" className="rounded-lg" />
                    </div>
                ))}
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className=" cursor-pointer w-24 h-24 border flex flex-col items-center text-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm  border-primary">
                    <input type="file" className="hidden" onChange={uploadImage} multiple={true} />
                    <UploadIcon className="h-5 w-5" />Add Images
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