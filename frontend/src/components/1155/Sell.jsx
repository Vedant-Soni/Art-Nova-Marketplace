import React, { useState } from 'react'

const Sell = ({ own1155 }) => {
    const [tokenAmount, setTokenAmount] = useState(0)
    return (
        <div>
            <div className='grid grid-cols-2 p-6 text-center ' >
                <div className='mx-4'>
                    <button className='bg-blue-500 h-full w-full text-white text-xl p-4 rounded-xl'>List {tokenAmount} item </button>
                </div>
                <div className='flex gap-4 text-2xl h-full w-full p-4 text-center border border-gray-300'>
                    <div className='bg-gray-200 '>+</div>
                    <div><p>{tokenAmount}</p></div>
                    <div>-</div>
                </div>

            </div>
        </div>
    )
}

export default Sell