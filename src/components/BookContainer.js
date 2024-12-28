'use client'

import React, { useContext, useEffect, useState } from 'react';
import BookCard from './BookCard';
import Config from '@/Config';
import { socketContext } from '@/Providers/SocketProvider';

const BookContainer = () => {
    const { newNotification } = useContext(socketContext);

    const [allBooks, setallBooks] = useState([]);

    useEffect(() => {
        fetch(`${Config.baseApi}/books`)
            .then(response => response.json())
            .then(data => {
                if (data?.success) {
                    setallBooks(data?.data)
                }
            })
    }, [newNotification?.book?._id])

    return (
        <div className='mt-10 my-20'>
            <h1 className='text-5xl text-center mb-10'>Books</h1>

            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {allBooks.length > 0 &&
                    allBooks.map(book =>
                        <BookCard
                            key={book?._id}
                            book={book}
                        />)
                }
            </div>
        </div>
    );
};

export default BookContainer;
