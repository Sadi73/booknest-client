'use client'

import Config from "@/Config";
import { Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required'),
    photoURL: Yup.string().required('PhotoURL is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const page = () => {
    const [message, setMessage] = useState(null);

    return (
        <>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Success!</h3>
                    <p className="py-4">{message}</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <div className='mt-10 flex flex-col md:flex-row border md:w-[80%] mx-auto rounded-lg gap-5 md:gap-0'>
                <div className='bg-teal-500 text-center text-white grow flex justify-center items-center rounded-l-lg py-5'>
                    <div className='space-y-5'>
                        <h1 className='text-3xl font-bold'>Welcome Back</h1>
                        <p className=''>To keep connected with us, <br /> please login with your personal info</p>
                        <div>
                            <Link href="/login"><button className='border px-10 py-3 rounded-full'>Sign In</button></Link>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-center md:w-[60%] py-5'>
                    <div>
                        <h1 className='text-center text-3xl text-teal-500 font-semibold mb-5'>Create Account</h1>

                        <div className=''>
                            <Formik
                                initialValues={{ name: '', email: '', photoURL: '', password: '', confirmPassword: '' }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    delete values?.confirmPassword;

                                    fetch(`${Config.baseApi}/register`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(values)
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            console.log(data)
                                            if (data?.status === 201) {
                                                document.getElementById('my_modal_2').showModal();
                                                setMessage(data?.message);
                                            }
                                        })
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                    /* and other goodies */
                                }) => (
                                    <form
                                        onSubmit={handleSubmit}
                                        className='space-y-5'
                                    >
                                        <div className='space-y-3'>

                                            <label className={`input input-bordered flex items-center gap-2 ${(touched?.name && errors?.name) ? ' border-red-300' : ''}`}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 16 16"
                                                    fill="currentColor"
                                                    className="h-4 w-4 opacity-70">
                                                    <path
                                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                                </svg>
                                                <input
                                                    name='name'
                                                    className='grow'
                                                    placeholder="Name"
                                                    value={values?.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </label>
                                            {(touched?.name && errors?.name) && <p className='text-red-300'>{errors.name}</p>}

                                            <label className={`input input-bordered flex items-center gap-2 ${(touched?.email && errors?.email) ? ' border-red-300' : ''}`}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 16 16"
                                                    fill="currentColor"
                                                    className="h-4 w-4 opacity-70">
                                                    <path
                                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                                    <path
                                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                                </svg>
                                                <input
                                                    name='email'
                                                    className='grow'
                                                    placeholder="Email"
                                                    value={values?.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </label>
                                            {(touched?.email && errors?.email) && <p className='text-red-300'>{errors.email}</p>}

                                            <label className={`input input-bordered flex items-center gap-2 ${(touched?.photoURL && errors?.photoURL) ? ' border-red-300' : ''}`}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 16 16"
                                                    fill="currentColor"
                                                    className="h-4 w-4 opacity-70">
                                                    <path
                                                        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                                    <path
                                                        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                                </svg>
                                                <input
                                                    name='photoURL'
                                                    className='grow'
                                                    placeholder="PhotoURL"
                                                    value={values?.photoURL}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </label>
                                            {(touched?.photoURL && errors?.photoURL) && <p className='text-red-300'>{errors.photoURL}</p>}

                                            <label className={`input input-bordered flex items-center gap-2 ${(touched?.password && errors?.password) ? ' border-red-300' : ''}`}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 16 16"
                                                    fill="currentColor"
                                                    className="h-4 w-4 opacity-70">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                        clipRule="evenodd" />
                                                </svg>
                                                <input
                                                    type="password"
                                                    name='password'
                                                    className='grow'
                                                    placeholder="Password"
                                                    value={values?.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </label>
                                            {(touched?.password && errors?.password) && <p className='text-red-300'>{errors.password}</p>}

                                            <label className={`input input-bordered flex items-center gap-2 ${(touched?.confirmPassword && errors?.confirmPassword) ? ' border-red-300' : ''}`}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 16 16"
                                                    fill="currentColor"
                                                    className="h-4 w-4 opacity-70">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                        clipRule="evenodd" />
                                                </svg>
                                                <input
                                                    type="password"
                                                    name='confirmPassword'
                                                    className='grow'
                                                    placeholder="Confirm Password"
                                                    value={values?.confirmPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </label>
                                            {(touched?.confirmPassword && errors?.confirmPassword) && <p className='text-red-300'>{errors.confirmPassword}</p>}

                                        </div>


                                        <div className='flex justify-center'>
                                            <button type='submit' className='bg-teal-500 text-white px-10 py-3 rounded-full'>Sign Up</button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>

                    </div>
                </div>


            </div>
        </>
    );
};

export default page;