import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addCategory, removeItemFromCategory, updateItemFromCategory } from '../../actions/categoryAction';
import Header from "./partials/AdminHeader";
import Left from "./partials/Left";

function CategoryDash() {
    // State hooks for managing categories and form visibility
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [nameError, setNameError] = useState('');
    const [newCategory, setNewCategory] = useState({
        name: '',
    });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Initialize isEditing as false
    const dispatch = useDispatch();
    const { categoryItems } = useSelector((state)=>state.category);

    const validateForm = () => {
        if (!newCategory.name.trim()) {
            setNameError('Please enter category name');
            return false;
        } else {
            setNameError('');
            return true;
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        if (isEditing && selectedCategory) {
            // If editing, dispatch an action to update the category
            dispatch(updateItemFromCategory(selectedCategory._id, newCategory));
        } else {
            // If not editing, dispatch an action to add the category
            dispatch(addCategory(newCategory));
        }
    
        // Reset form and selected category
        setNewCategory({ name: '' });
        setSelectedCategory(null);
        setIsEditing(false); // Reset isEditing after form submission
        setShowForm(false);
    };
    
    const handleEditClick = (categoryId) => {
        const categoryToUpdate = categoryItems.find(category => category._id === categoryId);
        if (categoryToUpdate) {
            setSelectedCategory(categoryToUpdate);
            setNewCategory({
                name: categoryToUpdate.name,
            });
            setIsEditing(true); // Set isEditing to true when editing
            setShowForm(true);
        } else {
            console.error(`Category with ID ${categoryId} not found.`);
        }
    };

    const handleDeleteClick = (categoryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            dispatch(removeItemFromCategory(categoryId));
        }
    };

    useEffect(() => {
        
    }, []);

    return (
        <>
            <Header />
            <section className="dash">
                <div className="container">
                    <div className="row">
                        <Left />
                        <div className="col-md-8">
                            <h1>Category Dashboard</h1>
                            <div>
                                <button onClick={() => setShowForm(!showForm)} className="btn btn-success form-control my-3">
                                    {showForm ? 'Hide Form' : 'Add Category'}
                                </button>
                                {showForm && (
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Add Category</h2>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleAddCategory}>
                                                <div className="form-group">
                                                    <label>Name:</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={newCategory.name}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                    />
                                                    {nameError && <div className="text-danger">{nameError}</div>}

                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary mt-2 form-control"
                                                >
                                                    {isEditing ? 'Update Category' : 'Add Category'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {!showForm && (
                                <div>
                                    <h2>Category List</h2>
                                    <table className='table table-dark table-hover'>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categoryItems.length > 0 ? (
                                                categoryItems.map((category) => (
                                                    <tr key={category._id}>
                                                        <td>{category.name}</td>
                                                        <td>
                                                            <button className='btn btn-success me-2' onClick={() => handleEditClick(category._id)}>Edit</button>
                                                            <button className='btn btn-danger' onClick={() => handleDeleteClick(category._id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="2">No categories found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default CategoryDash;
