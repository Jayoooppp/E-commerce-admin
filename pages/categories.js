import Layout from "@/components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Icon from "@heroicons/react/24/solid/PencilSquareIcon"
import TIcon from "@heroicons/react/24/solid/TrashIcon"
export default function Categories() {
    const [editedCategory, setEditedCategory] = useState(null)
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState("");
    const [properties, setProperties] = useState([])


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
        let data = {
            name,
            parentCategory,
            properties: properties.map((prop) => (
                { name: prop.name, values: prop.values.split(",") }
            ))
        };
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
        setProperties([])
        setParentCategory("")
        setName("")
        updateCategories()
    }

    const addNewProperty = () => {
        setProperties([...properties, { name: "", values: "" }])
    }

    const handlePropertyNameChange = (index, value) => {
        const new_prop = [...properties];
        new_prop[index].name = value;
        setProperties(new_prop)

    }

    const removeProperty = (index) => {
        const new_prop = [...properties];
        new_prop.splice(index, 1);
        console.log(new_prop)
        setProperties(new_prop)
    }

    const handlePropertyValueChange = (index, value) => {
        const new_prop = [...properties];
        new_prop[index].values = value;
        setProperties(new_prop)
    }

    const editCategory = (category) => {
        setEditedCategory(category)
        setName(category.name)
        setParentCategory(category?.parent?._id)
        setProperties(
            category.properties.map(({ name, values }) => ({
                name,
                values: values.join(',')

            }))
        )
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
            <form onSubmit={handleSubmit} className="">
                <div className="flex gap-1">

                    <input className="" type="text" placeholder="Category Name" value={name} onChange={e => setName(e.target.value)} />
                    <select className="" value={parentCategory} onChange={(e) => { setParentCategory(e.target.value) }}>
                        <option value="">No Parent</option>
                        {categories?.map((category, i) => (
                            <option value={category._id} key={i}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button onClick={addNewProperty} type="button" className="btn-default text-sm mb-2">Add New Property</button>
                    {properties.length > 0 && properties.map((property, i) => (
                        <div className="flex gap-1 mb-2">
                            <input value={property.name} className="mb-0" type="text" placeholder="Property name (Example:color)" onChange={(e) => handlePropertyNameChange(i, e.target.value)} />
                            <input value={property.values} className="mb-0" type="text" placeholder="values, comma separated" onChange={(e) => handlePropertyValueChange(i, e.target.value)} />
                            <button type="button" className="mb-0 btn-red" onClick={() => removeProperty(i)}>Remove</button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-1">
                    {editedCategory && (
                        <button type="button"
                            onClick={() => {
                                setEditedCategory(null)
                                setParentCategory("")
                                setProperties([])
                                setName("")
                            }}
                            className="btn-default" >
                            Cancel
                        </button>
                    )}

                    <button type="submit" className="btn-primary">Save</button>
                </div>
            </form>
            {!editedCategory && (
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
                                    <button className="btn-default mr-1" onClick={() => editCategory(category)}>Edit</button>
                                    <button className="btn-red" onClick={() => deleteCategory(category)}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </thead>
                </table>
            )}

        </Layout>
    )
}

