import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import avtar from '../images/avatr.png'
import Buy from './1155/Buy';
import Sell from './1155/Sell';

const NftDetail = () => {
    const { hash } = useParams()
    const [historyDropdown, setHistoryDropdown] = useState(false)
    const [listDropdown, setListDropdown] = useState(false)
    const [offerDropdown, setOfferDropdown] = useState(false)
    const [amount1155, setAmount1155] = useState(10)
    const [component, setComponent] = useState("Sell")
    return (
        <div>
            <div className='grid grid-cols-5 px-8'>
                <div className=' p-4 w-full  col-span-2'>
                    <div className='border-2 border-gray-200 h-full w-full rounded-xl' >
                        <div className='flex w-full justify-between p-2'>
                            <img src='https://ethresear.ch/uploads/default/original/1X/bc9ee6d276a251519dd12dca7202a9e3658a7eb3.png' alt='eth' className='h-6' />
                            <span class="material-symbols-outlined ">
                                favorite
                            </span>
                        </div>
                        <div className='p-8'>
                            <img src={avtar} alt="NFT" className='rounded-xl w-full ' />
                        </div>
                    </div>
                </div>



                <div className=' p-4 w-full h-fit col-span-3'>



                    <div className=' h-48 w-full rounded-xl' >
                        <div className='flex justify-between'>
                            <div>
                                user name
                            </div>
                            <div className='cursor-pointer'>
                                <span class="material-symbols-outlined m-2">
                                    send
                                </span>
                                <span class="material-symbols-outlined m-2">
                                    share
                                </span>
                                <span class="material-symbols-outlined m-2">
                                    more_horiz
                                </span>
                            </div>
                        </div>

                        {/* NFT name */}
                        <div>
                            <p className='text-4xl text-left my-2'>
                                Name
                            </p>
                            <p className='text-base text-left my-4'>Owned by You </p>
                        </div>
                    </div>

                    {/* 1155 */}
                    <div className='border-2 border-gray-200 h-full w-full text-center rounded-xl my-4' >
                        <div className='flex justify-between px-6 pt-6 '>

                            <div className=' text-xl text-left flex gap-4'>
                                <div className='h-fit flex  border-gray-300 text-gray-700 '   >
                                    <div className={(component === 'Sell') ? 'mx-4 cursor-pointer text-black border-b-2 border-black pb-3' : 'mx-4  cursor-pointer'} onClick={() => { setComponent("Sell") }}>Sell</div>
                                    <div className={(component === 'Buy') ? 'mx-4  cursor-pointer text-black border-b-2 border-black pb-3' : 'mx-4  cursor-pointer'} onClick={() => { setComponent("Buy") }}>Buy</div>
                                </div>
                            </div>
                            <div>You own {amount1155}</div>
                        </div>
                        <div className='border-t border-gray-300'>
                            {
                                (component === 'Buy')
                                    ?
                                    <Buy />
                                    :
                                    (component === "Sell")
                                        ?
                                        <Sell own1155={amount1155} />
                                        :
                                        <></>
                            }
                        </div>
                    </div>

                    {/* Price History */}
                    <div className='border-2 border-gray-200 h-full w-full text-center rounded-xl my-4' >
                        <div className='p-6 text-xl text-left flex justify-between  '>
                            <div className='flex gap-2 '>
                                <span class="material-symbols-outlined text-3xl">
                                    timeline
                                </span>
                                Price History
                            </div>
                            <span class="material-symbols-outlined cursor-pointer" onClick={() => { setHistoryDropdown(!historyDropdown) }}>
                                {!historyDropdown ? "expand_more" : "expand_less"}
                            </span>
                        </div>
                        {historyDropdown ?
                            <div className='w-full h-48 border-t  border-gray-300'>

                            </div>
                            : <></>}
                    </div>


                    {/* Listing */}
                    <div className='border-2 border-gray-200 h-full w-full text-center rounded-xl my-4' >
                        <div className='p-6 text-xl text-left flex justify-between  '>
                            <div className='flex gap-2 '>
                                <span class="material-symbols-outlined text-3xl">
                                    sell
                                </span>
                                Listings
                            </div>
                            <span class="material-symbols-outlined cursor-pointer" onClick={() => { setListDropdown(!listDropdown) }}>
                                {!listDropdown ? "expand_more" : "expand_less"}
                            </span>
                        </div>
                        {listDropdown ?
                            <div className='w-full h-48 border-t  border-gray-300'>

                            </div>
                            : <></>}
                    </div>

                    {/* Offers */}
                    <div className='border-2 border-gray-200 h-full w-full text-center rounded-xl my-4' >
                        <div className='p-6 text-xl text-left flex justify-between  '>
                            <div className='flex gap-2 '>
                                <span class="material-symbols-outlined text-3xl">
                                    list
                                </span>
                                Offers
                            </div>
                            <span class="material-symbols-outlined cursor-pointer" onClick={() => { setOfferDropdown(!offerDropdown) }}>
                                {!offerDropdown ? "expand_more" : "expand_less"}
                            </span>
                        </div>
                        {offerDropdown ?
                            <div className='w-full h-48 border-t  border-gray-300'>

                            </div>
                            : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NftDetail