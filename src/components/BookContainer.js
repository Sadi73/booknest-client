import React from 'react';
import BookCard from './BookCard';
import Config from '@/Config';

const BookContainer = async () => {
    // Fetch data on the server
    const response = await fetch(`${Config.baseApi}/books`, { cache: 'no-store' });
    const data = await response.json();

    const allBooks = data?.success ? data.data : [];

    return (
        <div className='mt-10 my-20'>
            <h1 className='text-5xl text-center mb-10'>Books</h1>

            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {allBooks.length > 0 &&
                    allBooks.map(book =>
                        <BookCard
                            key={book?.bookId}
                            book={book}
                        />)
                }
            </div>
        </div>
    );
};

export default BookContainer;
