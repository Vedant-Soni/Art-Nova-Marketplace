import React from 'react'

const Home = () => {
    return (
        <div>

            <div className=' w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:px-8 md:px-10 lg:px-16 px-4'>
                <div className='rounded-xl'>
                    <img src='https://nftnow.com/wp-content/uploads/2023/02/Ordinal-Punk-78.png' className='rounded-xl  ' alt='img' />
                </div>
                <div className='rounded-xl '>
                    <img src='https://nftnow.com/wp-content/uploads/2023/02/Ordinal-Punk-78.png' className='rounded-xl hidden sm:block' alt='img' />
                </div>
                <div className='rounded-xl '>
                    <img src='https://nftnow.com/wp-content/uploads/2023/02/Ordinal-Punk-78.png' className='rounded-xl hidden md:block ' alt='img' />
                </div>
                <div className='rounded-xl '>
                    <img src='https://nftnow.com/wp-content/uploads/2023/02/Ordinal-Punk-78.png' className='rounded-xl hidden lg:block' alt='img' />
                </div>
            </div>
        </div>
    )
}

export default Home