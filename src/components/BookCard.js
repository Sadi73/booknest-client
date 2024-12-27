import Image from 'next/image';
import React from 'react';
import StarIcon from '../assets/StarIcon.svg'

const BookCard = ({ book }) => {

    return (
        <div
            className="card bg-base-100 shadow-xl cursor-pointer"
        >
            <figure className="px-10 pt-10">
                <Image src={book?.image} alt="Book image" width={300} height={300} className="rounded-xl" />
            </figure>
            <div className="card-body ">
                <div className='flex gap-3'>
                    {book.tags.map((tag, index) => <p key={index} className='bg-[#23BE0A] bg-opacity-5 text-[#23BE0A] grow-0 px-2 py-1'>{tag}</p>)}
                </div>
                <h2 className="card-title text-2xl font-bold">{book?.bookName}</h2>
                <p className='font-semibold'>By: {book?.author}</p>
                <div className="card-actions border-t-2 border-dotted pt-3">
                    <p className='font-semibold'>{book?.category}</p>
                    <div className='flex items-center gap-1'>
                        <p>{book?.rating} </p>
                        <Image src={StarIcon} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;