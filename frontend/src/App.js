import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Profile from './components/Profile';
// import Collected from './components/Collected';
import NftDetail from './components/NftDetail';
import CreateNFT from './components/CreateNFT';
import AmountPopup from './components/AmountPopup';

function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;
