import React, { useEffect, useState } from 'react'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom"
import PostelPinCode from './Component/PostelPinCode'
import PinCodeForm from './Component/PinCodeForm'
export default function App() {
  
  
  return (
   <>
   <Routes>
   <Route path='/' element={<PinCodeForm></PinCodeForm>}></Route>
    <Route path='/pincode/:pin' element={<PostelPinCode></PostelPinCode>}></Route>
   </Routes>
   </>
  )
}
