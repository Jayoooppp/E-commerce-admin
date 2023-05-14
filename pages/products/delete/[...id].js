import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
const DeleteProduct = () => {
    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);
    useEffect(() => {
        if (id) {
            axios.get("/api/products?id=" + id).then((res) => {
                console.log(res)
                setProductInfo(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [id])
    const goBack = () => {
        router.push("/products")
    }
    const deleteProduct = async () => {
        await axios.delete("/api/products?id=" + productInfo._id).then((res) => {
            router.push("/products")
        })
    }
    return (

        <Layout>
            <h1 className="text-center">Are you sure you want to delete&nbsp;"{productInfo?.title}"</h1>
            <div className="flex gap-2 justify-center">
                <button
                    className="btn-red"
                    onClick={deleteProduct}>
                    Yes
                </button>
                <button
                    className="btn-default"
                    onClick={goBack}>
                    No
                </button>


            </div>
        </Layout>
    )
}

export default DeleteProduct;