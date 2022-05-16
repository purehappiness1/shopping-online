import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import MainPage from "./components/mainpage";
import Cart from "./components/cart";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
