import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Icon from "@heroicons/react/24/solid/PencilSquareIcon"
import TIcon from "@heroicons/react/24/solid/TrashIcon"
export default function products() {
    const [products, setproducts] = useState([])
    useEffect(() => {
        axios.get("/api/products").then((res) => {
            setproducts(res.data)
        })

    }, [])
    console.log(products)
    return (
        <Layout>
            <Link className="bg-blue-900 text-white rounded-md py-1 px-2" href={"/products/new"}>Add New Product</Link>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr>
                            <td>{product.title}</td>
                            <td>
                                <Link href={'/products/edit/' + product._id}><Icon className="h-4 w-4" />Edit</Link>
                                <Link href={'/products/delete/' + product._id}><TIcon className="h-4 w-4" />Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </Layout>
    )
}