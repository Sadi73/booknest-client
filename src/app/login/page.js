'use client'

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

const validationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const page = () => {

    return (
        <div className='mt-10'>
            <div className='flex flex-col-reverse md:flex-row border md:w-[80%] mx-auto min-h-[550px] rounded-lg gap-10 md:gap-0 pb-5 md:pb-0'>
                <div className='flex items-center justify-center grow'>
                    <div className='space-y-5'>
                        <h1 className='text-center text-3xl text-teal-500 font-semibold'>Sign In to Bongo Explorers</h1>

                        {/* {loginError && <p className='text-red-500'>Wrong Email or Password</p>} */}

                        <div className='px-5 md:px-0'>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    console.log(values)
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
                                        <input
                                            name='email'
                                            className={`py-3 ${(touched?.email && errors?.email) ? 'border-2 border-red-500' : ''}`}
                                            placeholder="Email"
                                            value={values?.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {(touched?.email && errors?.email) && <p className='text-red-500'>{errors.email}</p>}


                                        <input
                                            name='password'
                                            className={`py-3 ${(touched?.password && errors?.password) ? 'border-2 border-red-500' : ''}`}
                                            placeholder="Password"
                                            value={values?.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}

                                        />
                                        {(touched?.password && errors?.password) && <p className='text-red-500'>{errors.password}</p>}


                                        <div className='flex justify-center'>
                                            <button type='submit' className='bg-teal-500 text-white px-10 py-3 rounded-full'>Sign In</button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>

                    </div>
                </div>

                <div className=' bg-teal-500 text-center text-white w-full md:w-1/3 py-10 flex justify-center items-center rounded-r-lg'>
                    <div className='space-y-5'>
                        <h1 className='text-3xl font-bold'>Hello, Explorer!</h1>
                        <p className=''>Enter Your Personal Details <br /> and  start journey with us</p>
                        <div>
                            <Link href="/register"><button className='border px-10 py-3 rounded-full'>Sign Up</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;