// import React, { useContext, useState } from 'react';
// import { AppContext } from '../App';

// const AmountPopup = () => {
//   const handleMakeOffer = () => {};
//   const handleConfirmList = () => {};
//   const handleCancelList = () => {};
//   const [amount, setAmount] = useState();
//   const {} = useContext(AppContext);
//   return (
//     <div className="w-full h-full absolute top-0 bg-gray-300 bg-opacity-50  flex justify-center items-center backdrop-blur-sm ">
//       {popupOption == 1 ? (
//         <div className="h-fit w-fit bg-white  rounded-xl p-8">
//           <p className="text-left text-xl">Are You sure to Cancel Listing</p>
//           <div className="justify-between flex my-8">
//             <button
//               className="bg-blue-500 rounded-xl text-white p-4  text-xl"
//               onClick={() => {
//                 handleCancelList();
//               }}
//             >
//               Confirm
//             </button>
//             <button
//               className="text-blue-500 rounded-xl bg-white p-4  text-xl border border-gray-400"
//               onClick={() => setAmountPopup(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : popupOption == 2 ? (
//         <div className="h-fit w-fit bg-white  rounded-xl p-8">
//           {/* ittle */}
//           <div className="flex p-8 justify-center items-center text-center ">
//             <div>
//               <p className="text-3xl">Enter Amount</p>
//             </div>
//           </div>
//           {/* input fields */}
//           <div>
//             <div>
//               <p className="text-left text-xl">Enter Amount</p>
//               <input
//                 type="number"
//                 placeholder="Enter amount here"
//                 className="border border-gray-500 rounded-xl p-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                 onChange={(event) => {
//                   setAmount(event.target.value);
//                 }}
//               />
//               <div className="justify-between flex my-8">
//                 <button
//                   className="bg-blue-500 rounded-xl text-white p-4  text-xl"
//                   onClick={() => {
//                     handleConfirmList();
//                   }}
//                 >
//                   Confirm List
//                 </button>
//                 <button
//                   className="text-blue-500 rounded-xl bg-white p-4  text-xl border border-gray-400"
//                   onClick={() => setAmountPopup(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : popupOption === 3 ? (
//         <div className="h-fit w-fit bg-white  rounded-xl p-8">
//           {/* ittle */}
//           <div className="flex p-8 justify-center items-center text-center ">
//             <div>
//               <p className="text-3xl">Enter Amount</p>
//             </div>
//           </div>
//           {/* input fields */}
//           <div>
//             <div>
//               <p className="text-left text-xl">Enter Amount</p>
//               <input
//                 type="number"
//                 placeholder="Enter amount here"
//                 className="border border-gray-500 rounded-xl p-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                 onChange={(event) => {
//                   setAmount(event.target.value);
//                 }}
//               />
//               <div className="justify-between flex my-8">
//                 <button
//                   className="bg-blue-500 rounded-xl text-white p-4  text-xl"
//                   onClick={() => {
//                     handleMakeOffer();
//                   }}
//                 >
//                   Make Offer
//                 </button>
//                 <button
//                   className="text-blue-500 rounded-xl bg-white p-4  text-xl border border-gray-400"
//                   onClick={() => setAmountPopup(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default AmountPopup;
