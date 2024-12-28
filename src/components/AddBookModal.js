'use client'

import React from 'react';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Config from '@/Config';

// Validation Schema
const validationSchema = Yup.object({
    bookName: Yup.string().required("Book Name is required"),
    author: Yup.string().required("Author is required"),
    image: Yup.string().url("Invalid URL").required("Image URL is required"),
    review: Yup.string().required("Review is required"),
    totalPages: Yup.number()
        .positive("Total pages must be positive")
        .integer("Total pages must be an integer")
        .required("Total Pages is required"),
    rating: Yup.number()
        .min(0, "Rating must be at least 0")
        .max(5, "Rating cannot exceed 5")
        .required("Rating is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.string().required("Tags are required"),
    publisher: Yup.string().required("Publisher is required"),
    yearOfPublishing: Yup.number()
        .min(1900, "Year must be after 1900")
        .max(new Date().getFullYear(), "Year cannot be in the future")
        .required("Year of Publishing is required"),
    price: Yup.number().positive("Price must be positive").required("Price is required"),
});

// Initial Values
const initialValues = {
    bookName: "",
    author: "",
    image: "",
    review: "",
    totalPages: "",
    rating: "",
    category: "",
    tags: "",
    publisher: "",
    yearOfPublishing: "",
    price: "",
};

const AddBookModal = () => {
    const handleSubmit = (values) => {
        fetch(`${Config.baseApi}/add-book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data?.success) {
                    window.my_modal_5.close();
                }
            })
    };

    return (
        <div className="modal-box">
            <h1 className='text-3xl font-bold text-center mb-10'>Add Book</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className='space-y-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="bookName">Book Name:</label>
                            <Field className="border" type="text" id="bookName" name="bookName" />
                            {touched.bookName && errors.bookName && <div className="error text-red-700">{errors.bookName}</div>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="author">Author:</label>
                            <Field className="border" type="text" id="author" name="author" />
                            {touched.author && errors.author && <div className="error text-red-700">{errors.author}</div>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="image">Image URL:</label>
                            <Field className="border" type="text" id="image" name="image" />
                            {touched.image && errors.image && <div className="error text-red-700">{errors.image}</div>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="review">Review:</label>
                            <Field className="border" as="textarea" id="review" name="review" />
                            {touched.review && errors.review && <div className="error text-red-700">{errors.review}</div>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="totalPages">Total Pages:</label>
                            <Field className="border" type="number" id="totalPages" name="totalPages" />
                            {touched.totalPages && errors.totalPages && <div className="error text-red-700">{errors.totalPages}</div>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="rating">Rating:</label>
                            <Field className="border" type="number" step="0.1" id="rating" name="rating" />
                            {touched.rating && errors.rating && <div className="error text-red-700">{errors.rating}</div>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="category">Category:</label>
                            <Field className="border" as="select" id="category" name="category">
                                <option value="" disabled>
                                    Select Category
                                </option>
                                <option value="Fiction">Fiction</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="Biography">Biography</option>
                                <option value="Science Fiction">Science Fiction</option>
                                <option value="Fantasy">Fantasy</option>
                            </Field>
                            {touched.category && errors.category && <div className="error text-red-700">{errors.category}</div>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="tags">Tags:</label>
                            <Field className="border"
                                type="text"
                                id="tags"
                                name="tags"
                                placeholder="Enter tags separated by commas"
                            />
                            {touched.tags && errors.tags && <div className="error text-red-700">{errors.tags}</div>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="publisher">Publisher:</label>
                            <Field className="border" type="text" id="publisher" name="publisher" />
                            {touched.publisher && errors.publisher && <div className="error text-red-700">{errors.publisher}</div>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="yearOfPublishing">Year of Publishing:</label>
                            <Field className="border" type="number" id="yearOfPublishing" name="yearOfPublishing" />
                            {touched.yearOfPublishing && errors.yearOfPublishing && <div className="error text-red-700">{errors.yearOfPublishing}</div>}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="price">Price:</label>
                            <Field className="border" type="number" step="0.01" id="price" name="price" />
                            {touched.price && errors.price && <div className="error text-red-700">{errors.price}</div>}
                        </div>

                        <div className='flex justify-end items-center gap-5'>
                            <button type="submit" className='btn'>Submit</button>
                            <button type="button" className="btn" onClick={() => window.my_modal_5.close()}>Close</button>
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    );
};

export default AddBookModal;
