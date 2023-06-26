import { ethers } from 'ethers';
import { useRef } from 'react';
import React, { useState } from 'react';
import { ABI721 } from '../ABI721';
//MUI components
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
//Wagmi component
import { useSigner } from 'wagmi';
import { useAccount } from 'wagmi';
import { useSwitchNetwork } from 'wagmi';
//loader
import { ThreeDots } from 'react-loader-spinner';
//images
import EtherLogo from '../images/Ether.png';
import PolygonLogo from '../images/polygon.png';

const CreateNFT = () => {
  //Wagmi
  const { data: walletClient } = useSigner();
  const { address } = useAccount();
  //dropdown
  const [traitsDropdown, setTraitsDropdown] = useState(false);
  const [blockchainDropdown, setBlockchainDropdown] = useState(false);
  //traits adjustment
  const [traitsType, setTraitType] = useState('');
  const [traitsValue, setTraitsValue] = useState('');
  const [traits, setTraitData] = useState([]);
  //chain selection
  const [chainName, setChainName] = useState('Ethereum');
  const [supply, setSupply] = useState(1);
  //useref hook
  const uploadImage = useRef(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const [description, setDescription] = useState('');
  const [name, setName] = useState('  ');
  const [open, setOpen] = React.useState(false);

  //wagmi swith network event
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork({
      onSuccess(data) {
        console.log('Success', data);
      },
    });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const setTrait = () => {
    if (traitsType !== '' && traitsValue !== '') {
      const currentTrait = {
        trait_type: traitsType,
        value: traitsValue,
      };
      setTraitData([...traits, currentTrait]);
    }
  };

  const removeTraits = (index) => {
    const indexToRemove = index; // Index of the object to remove
    if (indexToRemove >= 0 && indexToRemove < traits.length) {
      const newArray = [...traits];
      newArray.splice(indexToRemove, 1);
      setTraitData(newArray);
    }
  };
  //chain selection in creation form
  const handleSelectNetwork = (chain, networkId) => {
    switchNetwork(networkId);
    setChainName(chain);
    setBlockchainDropdown(false);
  };

  const uploadToIpfs = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    const requestOptions = {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
    };

    try {
      const response = await fetch(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        requestOptions,
      );
      const data = await response.json();
      return data.IpfsHash;
    } catch (error) {
      console.error(error);
    }
  };
  const metadata = {};
  const uploadMeta = async (imageUrl) => {
    metadata.name = name;
    metadata.description = description;
    metadata.image = imageUrl;
    if (traits) {
      metadata.attributes = traits;
    }

    const json = JSON.stringify(metadata, null, 2);

    const file = new File([json], 'metadata.json', {
      type: 'application/json',
    });
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
          },
        },
      );
      const data = await response.json();
      return data.IpfsHash;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNFT = async () => {
    try {
      handleClickOpen();
      const imageIpfsHash = await uploadToIpfs(selectedFile);
      const imageUrl = `https://coffee-different-cat-534.mypinata.cloud/ipfs/${imageIpfsHash}`;
      const generatedMetadata = await uploadMeta(imageUrl);
      // console.log(generatedMetadata);

      const contract = new ethers.Contract(
        '0xA2Cb357ea1BbB90f62A6DFcBe8bFD0D2F5980F22 ',
        ABI721,
        walletClient,
      );

      try {
        const mint = await contract.safeMint(
          address,
          `ipfs://${generatedMetadata}`,
        );
        await mint.wait();
        const params = { owner: address, chainName };

        const response = await fetch('http://localhost:5000/createdNft', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
        const success = await response.json();
        console.log(success);
      } catch (error) {}

      // Here we can Mint NFT with contract
    } catch (e) {
      console.log('Create nft error:', e);
    } finally {
      handleClose();
    }
  };
  return (
    <div className="pt-16">
      <div className="justify-center flex pt-8 text-left">
        {/* title */}
        <div className=" w-1/3">
          <p className="text-3xl my-4 p-4">Create New Item</p>

          {/* image upload */}
          <div className=" p-4">
            <div>
              <h1>Upload Your Art Here</h1>
              <div
                className="bg-gray-200 border border-gray-400 h-56 relative rounded-xl cursor-pointer group "
                onClick={() => {
                  uploadImage.current.click();
                }}
              >
                {selectedFile && (
                  <div className="h-full justify-center flex object-cover ">
                    {selectedFile.type.startsWith('image/') && (
                      <img
                        className="h-full "
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected File"
                      />
                    )}
                    {selectedFile.type.startsWith('audio/') && (
                      <audio controls>
                        <source
                          src={URL.createObjectURL(selectedFile)}
                          type={selectedFile.type}
                        />
                      </audio>
                    )}
                    {selectedFile.type.startsWith('video/') && (
                      <video controls>
                        <source
                          src={URL.createObjectURL(selectedFile)}
                          type={selectedFile.type}
                        />
                      </video>
                    )}
                  </div>
                )}
                <div className="h-full w-full group-hover:backdrop-blur-sm absolute top-0 left-0 rounded-xl">
                  <p className="absolute  left-1/2 top-1/2 text-center  opacity-0  transition-opacity duration-300  group-hover:opacity-100 group-hover:flex ">
                    <span class="material-symbols-outlined left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2 text-7xl ">
                      add
                    </span>
                  </p>
                  {selectedFile && (
                    <span
                      class="material-symbols-outlined absolute right-1 top-1 opacity-0  transition-opacity duration-300  group-hover:opacity-100 group-hover:flex"
                      onClick={(event) => {
                        setSelectedFile(null);
                        event.stopPropagation();
                      }}
                    >
                      close
                    </span>
                  )}
                </div>
              </div>
              <input
                type="file"
                accept="image/*, audio/*, video/*"
                onChange={handleFileChange}
                hidden
                ref={uploadImage}
              />
              {/* {selectedFile && (
                // <div>
                //   <h2>Selected File:</h2>
                //   <p>Name: {selectedFile.name}</p>
                //   <p>Size: {selectedFile.size} bytes</p>
                //   <p>Type: {selectedFile.type}</p>
                //   {selectedFile.type.startsWith('image/') && (
                //     <img
                //       src={URL.createObjectURL(selectedFile)}
                //       alt="Selected File"
                //     />
                //   )}
                //   {selectedFile.type.startsWith('audio/') && (
                //     <audio controls>
                //       <source
                //         src={URL.createObjectURL(selectedFile)}
                //         type={selectedFile.type}
                //       />
                //     </audio>
                //   )}
                //   {selectedFile.type.startsWith('video/') && (
                //     <video controls>
                //       <source
                //         src={URL.createObjectURL(selectedFile)}
                //         type={selectedFile.type}
                //       />
                //     </video>
                //   )}
                // </div>
              )} */}
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col p-4">
            <label> Name</label>
            <input
              type="text"
              placeholder="Item Name"
              className="bg-transparent border border-gray-400 rounded-xl p-4 outline-0"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col p-4">
            <label> Description</label>
            <textarea
              rows=""
              cols=""
              placeholder="provide a detailed description of your item."
              className="bg-transparent border border-gray-400 rounded-xl p-4 outline-0"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>

          {/* properties-traits */}
          <div className="flex flex-col p-4 justify-center ">
            <div className="flex justify-between bg-transparent rounded-xl ">
              <p>Properties</p>
              <div>
                <span
                  class="material-symbols-outlined  bg-gray-200 rounded-xl p-2 cursor-pointer"
                  onClick={() => setTraitsDropdown(!traitsDropdown)}
                >
                  {!traitsDropdown ? 'add' : 'close'}
                </span>
              </div>
            </div>

            {/* current traits div */}
            {traits.length > 0 ? (
              <div className="bg-transparent border grid grid-cols-3 p-4 gap-2 border-gray-400 rounded-xl my-2 ">
                {traits.map((e, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-blue-100 p-2 rounded-md text-center flex items-center justify-between"
                    >
                      <div>
                        <p>{e.trait_type}</p>
                        <p className="text-gray-600">{e.value}</p>
                      </div>
                      <div>
                        <span
                          class="material-symbols-outlined cursor-pointer"
                          onClick={() => {
                            console.log(index);
                            removeTraits(index);
                            // setTraitData(traits.splice(index, 1));
                          }}
                        >
                          close
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
            {/* prop form */}
            {traitsDropdown ? (
              <div className="bg-transparent border border-gray-400 rounded-xl my-2">
                <div className="my-2 flex w-full gap-4 text-center p-6 ">
                  <div>
                    <p>Type</p>
                    <input
                      type="text"
                      placeholder="Type"
                      className="w-full border border-gray-400 rounded-xl p-2 bg-transparent"
                      onChange={(event) => {
                        setTraitType(event.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <p>Name</p>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border border-gray-400 rounded-xl p-2 bg-transparent"
                      onChange={(event) => {
                        setTraitsValue(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="p-8">
                  <button
                    className="p-2 bg-blue-500 w-full rounded-xl text-white my-2"
                    onClick={() => setTrait()}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* supply */}
          <div className="flex flex-col p-4">
            <label>Supply</label>
            <input
              type="text"
              placeholder="1"
              className="bg-transparent border border-gray-400 rounded-xl p-4 outline-0"
              onChange={(event) => {
                setSupply(event.target.value);
              }}
            />
          </div>

          {/* Blockchain Dropdown*/}
          <div className="flex flex-col p-4">
            <p>Blockchain</p>
            <div className="border-2 border-gray-200 h-full w-full text-center rounded-xl my-4">
              <div className="p-6 text-xl text-left flex justify-between  ">
                <div className="flex gap-2 ">
                  <img
                    src={
                      chainName === ('Ethereum' || 'Sepolia Testnet')
                        ? EtherLogo
                        : PolygonLogo
                    }
                    alt=""
                    className="h-8 bg-gray-300 rounded-full p-2 "
                  />
                  {chainName}
                </div>
                <span
                  class="material-symbols-outlined cursor-pointer"
                  onClick={() => {
                    setBlockchainDropdown(!blockchainDropdown);
                  }}
                >
                  {!blockchainDropdown ? 'expand_more' : 'expand_less'}
                </span>
              </div>
              {blockchainDropdown ? (
                <>
                  <div
                    className="w-full py-4 px-6 border-t text-left border-gray-300 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      handleSelectNetwork('Ethereum', 1);
                    }}
                  >
                    <img
                      src={EtherLogo}
                      alt=""
                      className="h-8 bg-gray-300 rounded-full p-2 "
                    />
                    Ethereum
                  </div>
                  <div
                    className="w-full py-4 px-6 border-t text-left border-gray-300 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      handleSelectNetwork('Sepolia Testnet', 11155111);
                    }}
                  >
                    <img
                      src={EtherLogo}
                      alt=""
                      className="h-8 bg-gray-300 rounded-full p-2 "
                    />
                    Sepolia Testnet
                  </div>
                  <div
                    className="w-full py-4 px-6 border-t text-left flex item-center  border-gray-300 gap-2 cursor-pointer"
                    onClick={() => {
                      handleSelectNetwork('Polygon Mumbai', 80001);
                    }}
                  >
                    <img
                      src={PolygonLogo}
                      alt=""
                      className="h-8 bg-gray-300 rounded-full p-2 "
                    />
                    Polygon Mumbai
                  </div>
                  <div
                    className="w-full py-4 px-6 border-t text-left flex item-center  border-gray-300 gap-2 cursor-pointer"
                    onClick={() => {
                      handleSelectNetwork('Polygon Mainnet', 137);
                    }}
                  >
                    <img
                      src={PolygonLogo}
                      alt=""
                      className="h-8 bg-gray-300 rounded-full p-2 "
                    />
                    Polygon Mainnet
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* create button */}
          <div className=" p-4">
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Transaction Running...
              </DialogTitle>
              <DialogContent>
                <div className="text-center  flex flex-col">
                  <div className="flex justify-center">
                    <p className="text-xl">Nft Creating</p>
                  </div>
                </div>
              </DialogContent>
              <div className="flex justify-center">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#9DB2BF"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            </Dialog>
            <button
              className="bg-blue-500 px-4 py-2 text-2xl text-white rounded-xl"
              onClick={() => {
                handleCreateNFT();
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
