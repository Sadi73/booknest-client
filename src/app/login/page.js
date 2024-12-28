'use client'

import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Config from '@/Config';
import { useRouter } from 'next/navigation';
import { authContext } from '@/Providers/AuthProvider';

const validationSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const page = () => {

    const router = useRouter();
    const { setIsAuthenticated } = useContext(authContext);

    const [loginErrorMessage, setLoginErrorMessage] = useState(null)

    return (
        <div className='mt-10'>
            <div className='flex flex-col-reverse md:flex-row border md:w-[80%] mx-auto min-h-[550px] rounded-lg gap-10 md:gap-0 pb-5 md:pb-0'>
                <div className='flex items-center justify-center grow'>
                    <div className='space-y-5'>
                        <h1 className='text-center text-3xl text-teal-500 font-semibold'>Sign In to Booknest</h1>

                        {loginErrorMessage && <p className='text-red-500'>{loginErrorMessage}</p>}

                        <div className='px-5 md:px-0'>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    fetch(`${Config.baseApi}/login`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(values)
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data?.success) {
                                                const userInfo = {
                                                    userName: data?.user?.name,
                                                    email: data?.user?.email,
                                                    token: data?.token,
                                                    role: data?.user?.role
                                                }
                                                localStorage.setItem('authInfo', JSON.stringify(userInfo));
                                                setIsAuthenticated(true);
                                                router.push('/');
                                            } else {
                                                setLoginErrorMessage(data?.message)
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
                                        className='flex flex-col space-y-5'
                                    >
                                        <label className={`input input-bordered flex items-center gap-2 ${(touched?.email && errors?.email) ? ' border-red-500' : ''}`}>
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
                                                type='text'
                                                name='email'
                                                className={`grow ${(touched?.email && errors?.email) ? ' border-red-500' : ''}`}
                                                placeholder="Email"
                                                value={values?.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {(touched?.email && errors?.email) && <p className='text-red-500'>{errors.email}</p>}
                                        </label>


                                        <label className={`input input-bordered flex items-center gap-2 ${(touched?.password && errors?.password) ? ' border-red-500' : ''}`}>
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
                                                type='password'
                                                name='password'
                                                className='grow'
                                                placeholder="Password"
                                                value={values?.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {(touched?.password && errors?.password) && <p className='text-red-500'>{errors.password}</p>}
                                        </label>


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