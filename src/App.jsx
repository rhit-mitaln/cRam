import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { logIn, signUp } from './firebase'
import Login from './pages/login/login'
import Signup from './pages/sign in/signup'

function App() {

  return (
    
    <div className='App'>
      <Signup />
    </div>
    
    /*<div>
      
      <button onClick={() => signUp("test@example.com", "password")}>
        Sign Up
      </button>
      <button onClick={() => logIn("test@example.com", "password")}>
        Test Login
      </button>
    </div>
    */
  )


}

export default App
