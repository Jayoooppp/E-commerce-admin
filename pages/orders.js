import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner2";
import { getSession } from "next-auth/react";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("/api/orders")
            .then((res) => {
                setOrders(res.data);
            })
    }, [])

    if (orders?.length > 0) {

        return (
            <Layout>
                <h1>Orders</h1>
                <table className="basic">
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>Recipient</th>
                            <th>Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.length > 0 && orders?.map((order) => (
                            <>
                                <tr>
                                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                                    <td>
                                        {order.name} {order.email}<br />
                                        {order.city} {order.postcode}
                                        {order.country}<br />
                                        {order.address}
                                    </td>
                                    <td>
                                        {order.line_items?.map((l) => (
                                            <>
                                                {l.price_data?.product_data.name} X
                                                {l.quantity} <br />
                                            </>
                                        ))}
                                    </td>
                                </tr>
                            </>
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