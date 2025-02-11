
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import DetailPage from './DetailPage';

function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<DetailPage/>} />
    </Routes>
  </Router>
  )
}

export default App
