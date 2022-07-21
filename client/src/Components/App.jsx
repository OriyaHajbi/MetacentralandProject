import React from "react";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Main from "../Pages/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App(){
    return  <Router>
                <div className="min-h-screen home">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/main" element={<Main/>}/>
                    </Routes>
                </div>
             </Router>
}




export default App;