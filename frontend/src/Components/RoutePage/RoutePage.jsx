import React from "react";
import { Navbar } from "./Navbar/navbar";
import { Home } from "./Home/home";
import { About } from "./About/about" ;
import { Footer } from "./Footer/footer";
import { Feature} from "./Feature/feature";
import { Alumni} from "./Alumini/alumni";

export default function RoutePage(){
    return (
        <>
        <Navbar/>
        <Home/>
        <About/>
        <Feature/>
        <Alumni/>
        <Footer/>
        </>
    )

}
