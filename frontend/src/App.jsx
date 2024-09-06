import React from "react";
import AlumniRegistration from "./components/auth/AlumniRegistration";
import StudentRegistration from "./components/auth/StudentRegistration";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import RootPage from "./components/RootPage";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/rootPage' element={<RootPage />} />
      <Route path='/register-student' element={<StudentRegistration />} />
      <Route path='/register-alumni' element={<AlumniRegistration />} />
      <Route path="*" element={<Navigate to="/rootPage" />} />
    </>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App