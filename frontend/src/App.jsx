import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/home' element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App;