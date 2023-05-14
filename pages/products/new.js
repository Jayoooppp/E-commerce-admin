import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import NewProductForm from "./NewProductForm";

const new_product = () => {

    return (
        <Layout>
            <h1>Add Product</h1>

            <NewProductForm />

        </Layout>
    )
}
export default new_product;  