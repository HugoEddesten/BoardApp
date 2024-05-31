import { Routes, Route } from "react-router-dom";

import './css/site.css'
import Home from './pages/Home'
import Header from './components/Header'
import Boards from "./pages/Boards";
import Contact from "./pages/Contact";
import About from "./pages/About";



function App() {


    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/boards" element={<Boards />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                    
            </Routes>
        </>
    )            
}

export default App
