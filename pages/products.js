import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Icon from "@heroicons/react/24/solid/PencilSquareIcon"
import TIcon from "@heroicons/react/24/solid/TrashIcon"
import { getSession, useSession } from "next-auth/react";
import Spinner from "@/components/Spinner2";

function products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("/api/products")
            .then((res) => {
                setProducts(res.data)
            })
    }, [])

    if (products?.length > 0) {

        return (
            <Layout>
                <Link className="btn-primary" href={"/products/new"}>Add New Product</Link>
                <table className="basic mt-2">
                    <thead>
                        <tr>
                            <td>Product Name</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.title}</td>
                                <td>
                                    <Link className="btn-default" href={'/products/edit/' + product._id}><Icon className="h-4 w-4" />Edit</Link>
                                    <Link className="btn-red" href={'/products/delete/' + product._id}><TIcon className="h-4 w-4" />Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </Layout>
        )
    }

    return (
        <>
            <Layout>
                <Spinner />
            </Layout>
        </>
    )
}
export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: process.env.NEXT_APP_URL + '/Auth'

            }
        }
    }

    return {
        props: {
            data: "Authenticated"
        },
    };

}





export default products;