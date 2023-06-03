import Layout from "@/components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
export default function Categories() {
    const [editedCategory, setEditedCategory] = useState(null)
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");

    const updateCategories = () => {
        axios.get("/api/category").then((res) => {
            setCategories(res.data);
        })
    }
    useEffect(() => {
        updateCategories()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { name, parentCategory };
        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put("/api/category", data)
                .then((res) => {
                    setEditedCategory(null)
                })

        } else {
            await axios.post("/api/category", data)
                .then((res) => {
                })

        }
        updateCategories()
    }

    const editCategory = (category) => {
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category?.parent?._id)
    }
    const deleteCategory = (category) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if (result.isConfirmed) {
                const { _id } = category;
                await axios.delete('/api/category?_id=' + _id);
                updateCategories();
            }
        });
    }
    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category ${editedCategory?.name}` : `Create New Category`}</label>
            <form onSubmit={handleSubmit} className="flex gap-1">
                <input className="mb-0" type="text" placeholder="Category Name" value={name} onChange={e => setName(e.target.value)} />
                <select className="mb-0" value={parentCategory} onChange={(e) => { setParentCategory(e.target.value) }}>
                    <option value="">No Parent</option>
                    {categories?.map((category, i) => (
                        <option value={category._id} key={i}>{category.name}</option>
                    ))}
                </select>
                <button type="submit" className="btn-primary">Save</button>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category Name</td>
                        <td>Parent Category</td>
                        <td></td>
                    </tr>
                    {categories?.map((category) => (
                        <tr>
                            <td>{category?.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td>
                                <button className="btn-primary mr-1" onClick={() => editCategory(category)}>Edit</button>
                                <button className="btn-primary" onClick={() => deleteCategory(category)}>Delete</button>
                            </td>
                        </tr>
                    ))}

                </thead>
            </table>
        </Layout>
    )
}

