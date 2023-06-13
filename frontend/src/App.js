import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Profile from './components/Profile';
import Collected from './components/Collected';
import NftDetail from './components/NftDetail';

function App() {
  return (
    <Router>

      <div className="App">
        <Header />
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
          </Route>

          <Route path='/profile' element={<Profile />} />
          <Route path='/nftdetail/:hash' element={<NftDetail />} />


        </Routes>

      </div>
    </Router>
  );
}

export default App;
