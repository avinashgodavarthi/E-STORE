import React from 'react'
import "./Title.css"
import { useNavigate } from 'react-router-dom'


function Title(){
    var nav = useNavigate()
   
    return(

        <div className='div'>

           <button className='btn' onClick={() => nav('/signup')}>Signup</button>
             <h1 className='title'>🛒 E-STORE</h1>
             
        </div>

    )
}

export default Title