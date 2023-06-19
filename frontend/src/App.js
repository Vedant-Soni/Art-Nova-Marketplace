import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Profile from './components/Profile';
import Footer from './components/Footer';
import NftDetail from './components/NftDetail';
import { createContext, useState } from 'react';
import AmountPopup from './components/AmountPopup';
import CreateNFT from './components/CreateNFT';
import { WagmiConfig } from 'wagmi';

import { client } from './utils/wagmiConfigFile';

export const AppContext = createContext();

function App() {
  return (
    <WagmiConfig client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/create" element={<CreateNFT />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nftdetail/:address/:id" element={<NftDetail />} />
        </Routes>
        <Footer />
      </Router>
    </WagmiConfig>
  );
}

export default App;
