import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Login'
import Products from './Products'
import Title from './Title'
import Signup from './Signup'




function App(){

  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Title/>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/products' element={<Products/>}/>
       

      </Routes>
      </BrowserRouter>


    </div>
  )
}
export default App