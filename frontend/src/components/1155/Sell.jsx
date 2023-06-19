import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createOrder1155 } from '../../createOrder1155';
import { useAccount, useSigner } from 'wagmi';

const Sell = (props) => {
  const { address } = useAccount();
  const { data: walletClient } = useSigner();
  const [open, setOpen] = React.useState(false);

  const [sellValue, setSellValue] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(1);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleListItem = async () => {
    const nftOwner = props.own1155.nftData?.nftOwnerAddress;
    const nftContract = props.own1155.nftData?.nftJsonData.contract.address;
    const tokenId = props.own1155.nftData?.tokenId;
    // const order = { sell: 'yes' };
    const order = await createOrder1155({
      price: sellValue,
      tokenId,
      tokenAddress: nftContract,
      signer: walletClient,
      offerer: address,
      tokenAmount,
    });
    if (order) {
      const availableForListing = props.own1155.availableToList - tokenAmount;
      const listedNftData = {
        nftOwner,
        nftContract,
        tokenId,
        order,
        listprice: sellValue,
        totalListed: tokenAmount,
        availableForListing,
      };
      const response = await fetch(`http://localhost:5000/list1155`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listedNftData),
      });
      const responseData = await response.json();
      console.log(responseData);
    }

    // tokenAmount
    //listing value accsessible here
    //code logic
    //wait till transaction complete
    handleClose();
  };
  function increase() {
    if (tokenAmount < props.own1155.availableToList)
      setTokenAmount(tokenAmount + 1);
  }
  function decrease() {
    if (tokenAmount > 1) setTokenAmount(tokenAmount - 1);
  }
  return (
    <div>
      <div className="grid grid-cols-2 p-6 text-center ">
        <div className="mx-4">
          <button
            className="bg-blue-500 h-full w-full text-white text-xl p-4 rounded-xl"
            onClick={() => {
              handleClickOpen();
            }}
          >
            List {tokenAmount} item{' '}
          </button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Enter Amount</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Value of NFT"
                type="number"
                fullWidth
                variant="standard"
                onChange={(event) => {
                  setSellValue(event.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => handleListItem()} variant="contained">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="flex gap-6 text-2xl h-full w-fit p-4 px-8 rounded-xl text-center border border-gray-300">
          <div className="cursor-pointer" onClick={() => decrease()}>
            -
          </div>
          <div>
            <p>{tokenAmount}</p>
          </div>
          <div className="cursor-pointer" onClick={() => increase()}>
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
