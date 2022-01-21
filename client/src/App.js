import './index.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Nav from './pages/Nav';
import Home from './pages/Home';
import Logup from './pages/Logup';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Nav />}>
          <Route index element={<Home /> } />
          <Route path='logup' element={<Logup />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
