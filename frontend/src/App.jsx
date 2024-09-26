import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import RoutePage from './Components/RoutePage/RoutePage';
import './App.css';

import VideoStream from './Components/Video_Stream/VideoStream'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path ="/" element={<RoutePage/>}/>
      <Route path='/home' element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App;