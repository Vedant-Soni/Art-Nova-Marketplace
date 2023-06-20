import { ethers } from 'ethers';
import React, { useState } from 'react';
import { useSigner } from 'wagmi';
import { ABI721 } from '../ABI721';
import { useAccount } from 'wagmi';
const CreateNFT = () => {
  const { data: walletClient } = useSigner();
  const { address } = useAccount();
  const [traitsDropdown, setTraitsDropdown] = useState(false);
  const [traitsType, setTraitType] = useState('');
  const [traitsValue, setTraitsValue] = useState('');
  const [traits, setTraitData] = useState([]);
  const [supply, setSupply] = useState(1);
  const [blockchainDropdown, setBlockchainDropdown] = useState(false);
  const [chainName, setChainName] = useState('Ethereum');
  const [name, setName] = useState('  ');
  const [description, setDescription] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [symbolSrc, setSymbolSrc] = useState(
    'https://ethresear.ch/uploads/default/original/1X/bc9ee6d276a251519dd12dca7202a9e3658a7eb3.png',
  );

  const ethLogo =
    'https://ethresear.ch/uploads/default/original/1X/bc9ee6d276a251519dd12dca7202a9e3658a7eb3.png';
  const polygonLogo =
    'https://w7.pngwing.com/pngs/659/334/png-transparent-polygon-matic-coin-cryptocoin-exchange-coins-crypto-blockchain-cryptocurrency-logo-glyph-icon-thumbnail.png';

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
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
  const handleSelectNetwork = (chain, logo) => {
    setChainName(chain);
    setSymbolSrc(logo);
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
    const imageIpfsHash = await uploadToIpfs(selectedFile);
    const imageUrl = `https://coffee-different-cat-534.mypinata.cloud/ipfs/${imageIpfsHash}`;
    const generatedMetadata = await uploadMeta(imageUrl);
    // console.log(generatedMetadata);


    const contract = new ethers.Contract(
      '0x9EbBF04A84823CE9a3E4B10Bd4880e08aEF9679e',
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
  };
  return (
    <div>
      <div className="justify-center flex pt-8 text-left">
        {/* title */}
        <div className=" w-1/3">
          <p className="text-3xl my-4 p-4">Create New Item</p>
          {/* image upload */}
          <div className=" p-4">
            <div>
              <h1>File Input</h1>
              <input
                type="file"
                accept="image/*, audio/*, video/*"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <div>
                  <h2>Selected File:</h2>
                  <p>Name: {selectedFile.name}</p>
                  <p>Size: {selectedFile.size} bytes</p>
                  <p>Type: {selectedFile.type}</p>
                  {selectedFile.type.startsWith('image/') && (
                    <img
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
                    src={symbolSrc}
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
                      handleSelectNetwork('Ethereum', ethLogo);
                    }}
                  >
                    <img
                      src={ethLogo}
                      alt=""
                      className="h-8 bg-gray-300 rounded-full p-2 "
                    />
                    Ethereum
                  </div>
                  <div
                    className="w-full py-4 px-6 border-t text-left border-gray-300 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      handleSelectNetwork('Sepolia Testnet', ethLogo);
                    }}
                  >
                    <img
                      src={ethLogo}
                      alt=""
                      className="h-8 bg-gray-300 rounded-full p-2 "
                    />
                    Sepolia Testnet
                  </div>
                  <div
                    className="w-full py-4 px-6 border-t text-left flex item-center  border-gray-300 gap-2 cursor-pointer"
                    onClick={() => {
                      handleSelectNetwork('Polygon Mumbai', polygonLogo);
                    }}
                  >
                    <img
                      src={polygonLogo}
                      alt=""
                      className="h-8 bg-gray-300 rounded-full p-2 "
                    />
                    Polygon Mumbai
                  </div>
                  <div
                    className="w-full py-4 px-6 border-t text-left flex item-center  border-gray-300 gap-2 cursor-pointer"
                    onClick={() => {
                      handleSelectNetwork('Polygon Mainnet', polygonLogo);
                    }}
                  >
                    <img
                      src={polygonLogo}
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

          <div className=" p-4">
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
