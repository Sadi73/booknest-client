import Link from 'next/link';
import React from 'react';
import bannerImg from '../assets/bannerImg.png'
import Image from 'next/image';

const Banner = () => {
    return (
        <div className=' flex items-center justify-center md:px-20 py-10'>
            <div>
                <h1 className='text-3xl font-bold md:text-5xl'>Books to Freshen up  Your Bookshelf</h1>
                <Link href='/listed-books'> <button className='bg-[#23BE0A] text-white font-semibold p-3 mt-5 rounded-md'>View The List</button></Link>
            </div>

            <div>
                <Image src={bannerImg} alt="banner image" />
            </div>

        </div>
    );
};

export default Banner;