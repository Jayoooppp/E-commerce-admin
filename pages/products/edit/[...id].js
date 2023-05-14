import Layout from "@/components/Layout"
import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import NewProductForm from "../NewProductForm";
const EditProduct = () => {
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
    return (
        <Layout>
            <h1>Edit Product</h1>
            {productInfo && (
                <NewProductForm productInfo={productInfo} />
            )}
        </Layout>
    )
}
export default EditProduct;