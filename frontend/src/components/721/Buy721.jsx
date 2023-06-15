import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Buy721 = ({ owner }) => {
  const handleBuyNow = () => {};
  const [open, setOpen] = React.useState(false);
  const [offerAmount, setOfferAmount] = useState(0);
  const [listingValue, setListingValue] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // confirm listing
  const handleListItem = () => {
    console.log(listingValue); //listing value accsessible here
    //code logic
    //wait till transaction complete
    handleClose();
  };
  //cancel list
  const handleCancelList = () => {
    //code logic and wait is here
    handleClickOpen();
  };
  const handleMakeOffer = () => {
    console.log(offerAmount); //it is accsessible here
    //code logic here wait for transaction
    handleClickOpen();
  };
  const {} = useContext(AppContext);
  const listed = false;
  const userAddress = '0x00';
  return (
    <div>
      <div className="grid grid-cols-2 p-6 text-center ">
        {owner == userAddress && listed == true ? (
          <>
            <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center ">
              <button
                disabled
                className="flex justify-center gap-4 h-full w-full text-blue-500 border border-gray-300 text-xl p-4 rounded-xl"
              >
                <span class="material-symbols-outlined text-3xl">sell</span>
                Edit list
              </button>
            </div>
            <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center ">
              <button
                className="flex justify-center gap-4 h-full w-full text-blue-500 border border-gray-300 text-xl p-4 rounded-xl"
                onClick={() => {
                  handleCancelList();
                }}
              >
                <span class="material-symbols-outlined text-3xl">sell</span>
                Cancel list
              </button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Are you sure to cancel listing ?
                </DialogTitle>
                <DialogContent></DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button variant="contained" onClick={handleClose} autoFocus>
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </>
        ) : owner == userAddress && listed == false ? (
          <>
            <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center">
              <button
                className="flex justify-center gap-4 h-full w-full text-white border bg-blue-500 border-gray-300 text-xl p-4 rounded-xl"
                onClick={() => {
                  handleClickOpen();
                }}
              >
                List item
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
                      setListingValue(event.target.value);
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
            <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center ">
              <button
                disabled
                className="flex justify-center gap-4 h-full w-full text-blue-500 border border-gray-300 text-xl p-4 rounded-xl"
              >
                <span class="material-symbols-outlined text-3xl">sell</span>Make
                Edit item
              </button>
            </div>
          </>
        ) : owner != userAddress && listed == true ? (
          <>
            <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center">
              <button
                className="flex justify-center gap-4 h-full w-full text-white border bg-blue-500 border-gray-300 text-xl p-4 rounded-xl"
                onClick={() => {
                  handleBuyNow();
                }}
              >
                Buy now
              </button>
            </div>
            <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center ">
              <button
                disabled
                className="flex justify-center gap-4 h-full w-full text-blue-500 border border-gray-300 text-xl p-4 rounded-xl"
              >
                <span class="material-symbols-outlined text-3xl">sell</span>
                Make Offer
              </button>
            </div>
          </>
        ) : owner != userAddress && listed == false ? (
          <>
            <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center">
              <button
                className="flex justify-center gap-4 h-full w-full text-white border bg-blue-500 border-gray-300 text-xl p-4 rounded-xl"
                onClick={() => {
                  // setAmountPopup(true);
                  // setPopupOption(3);
                  handleClickOpen();
                }}
              >
                Make Offer
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
                      setOfferAmount(event.target.value);
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={() => handleMakeOffer()} variant="contained">
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Buy721;
