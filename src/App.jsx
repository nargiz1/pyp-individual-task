import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";


import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import About from "./pages/About";
import Add from './pages/AddUser'


function App() {
  return (
      <ChakraProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/about" element={<About />} />
            <Route path="/users/add" element={<Add />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
  );
}

export default App;
