import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import RoutePage from './Components/RoutePage/RoutePage';
import { Home } from "./Components/RoutePage/Home/home" ;
import { About } from "./Components/RoutePage/About/about" ;
import { Footer } from "./Components/RoutePage/Footer/footer";
import { Feature} from "./Components/RoutePage/Feature/feature";
import { Alumni} from "./Components/RoutePage/Alumini/alumni";
import Signup from "./Auth/Signup"
import Login from './Auth/Login';
import VideoStream from './Components/Video_Stream/VideoStream'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path ="/" element={<RoutePage/>}/>
      <Route path ="/home" element={<Dashboard/>}/>
      <Route path ="/about" element={<About/>}/>
      <Route path ="/features" element={<Feature/>}/>
      <Route path ="/alumni" element={<Alumni/>}/>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App;