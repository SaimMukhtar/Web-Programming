import Navbar from "./Navbar";
import About from "./About";
import Home from "./Home";

import {createBrowserRouter, RouterPtrovider} from "react-router-dom";

const App = () => {
    const router = createBrowserRouter([
        {
            path:"/",
            element:
            <>
            <Navbar/>
            <Home/>
            </>
        },
        {
            path:"/About",
            element:
            <>
            <Navbar/>
            <About/>
            </>
        }
    ])
    return (
        <>
        <Navbar/>
        </>
    );
}