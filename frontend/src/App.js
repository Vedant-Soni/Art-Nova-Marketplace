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

// import { ToastContainer, toast } from 'react-toastify';
import { client } from './utils/wagmiConfigFile';
import ScrollToTop from './components/ScrollToTop';

export const AppContext = createContext();

function App() {
  const [walletopen, setWalletOpen] = useState(false);
  return (
    <WagmiConfig client={client}>
      <AppContext.Provider value={{ walletopen, setWalletOpen }}>
        {/* <ToastContainer /> */}
        <Router>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/create" element={<CreateNFT />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/nftdetail/:nftaddress/:id" element={<NftDetail />} />
          </Routes>
          <Footer />
        </Router>
      </AppContext.Provider>
    </WagmiConfig>
  );
}

export default App;
