import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders({ data }) {
    const [orders, setOrders] = useState(data || []);

    // useEffect(() => {
    //     axios.get("/api/orders")
    //         .then((res) => {
    //             setOrders(res.data);
    //         })
    // }, [])

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
                    {orders.length > 0 && orders.map((order) => (
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
                                    {order.line_items.map((l) => (
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
export async function getServerSideProps() {
    const response = await axios.get(process.env.NEXT_APP_URL + "/api/orders");
    const data = response.data
    return {
        props: {
            data
        }
    }
}