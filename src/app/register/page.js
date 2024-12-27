'use client'

import Config from "@/Config";
import { Formik } from "formik";
import Link from "next/link";
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

    return (
        <div className='mt-10'>
            <div className='flex flex-col md:flex-row border md:w-[80%] mx-auto rounded-lg gap-5 md:gap-0'>
                <div className='bg-teal-500 text-center text-white grow flex justify-center items-center rounded-l-lg py-5'>
                    <div className='space-y-5'>
                        <h1 className='text-3xl font-bold'>Welcome Back</h1>
                        <p className=''>To keep connected with us, <br /> please login with your personal info</p>
                        <div>
                            <Link href="/login"><button className='border px-10 py-3 rounded-full'>Sign In</button></Link>
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-center md:w-[60%]'>
                    <div className='space-y-5 '>
                        <h1 className='text-center text-3xl text-teal-500 font-semibold'>Create Account</h1>



                        <div className='py-5'>
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
                                        .then(data => console.log(data))
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
                                        <div className='w-3/4 mx-auto space-y-3'>
                                            <input
                                                name='name'
                                                className={`py-3 ${(touched?.name && errors?.name) ? 'border-2 border-red-300' : ''}`}
                                                placeholder="Name"
                                                value={values?.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {(touched?.name && errors?.name) && <p className='text-red-300'>{errors.name}</p>}

                                            <input
                                                name='email'
                                                className={`py-3 ${(touched?.email && errors?.email) ? 'border-2 border-red-300' : ''}`}
                                                placeholder="Email"
                                                value={values?.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {(touched?.email && errors?.email) && <p className='text-red-300'>{errors.email}</p>}

                                            <input
                                                name='photoURL'
                                                className={`py-3 ${(touched?.photoURL && errors?.photoURL) ? 'border-2 border-red-300' : ''}`}
                                                placeholder="PhotoURL"
                                                value={values?.photoURL}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {(touched?.photoURL && errors?.photoURL) && <p className='text-red-300'>{errors.photoURL}</p>}


                                            <input
                                                name='password'
                                                className={`py-3 ${(touched?.password && errors?.password) ? 'border-2 border-red-300' : ''}`}
                                                placeholder="Password"
                                                value={values?.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {(touched?.password && errors?.password) && <p className='text-red-300'>{errors.password}</p>}

                                            <input
                                                name='confirmPassword'
                                                className={`py-3 ${(touched?.confirmPassword && errors?.confirmPassword) ? 'border-2 border-red-300' : ''}`}
                                                placeholder="Confirm Password"
                                                value={values?.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
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
        </div>
    );
};

export default page;