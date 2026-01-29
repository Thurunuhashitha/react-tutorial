import React from 'react' 
import Button from '../../components/button/button'
import './style.css'
import Input from '../../components/input/input'
import Box from '@mui/material/Box'
import {useNavigate } from 'react-router-dom'; 

export default function Login() {
  
   //navigate using function
    const navigate = useNavigate()

    function navi() {
        navigate('/home') 
    }

  return (
    <Box className='main'>
      <Box className='form'>
        <h1>Register Page</h1>
        <Input
          label="name"
          type="text"
        />
        <Input
          label="address"
          type="text"
        />
        <Input
          label="email"
          type="email"
        />
        <Input
          label="password"
          type="password"
        />
        <Box onClick={navi}> 
          <Button className='button'
            text="Cleck me to Login" 
          /> 
        </Box>
      </Box>
    </Box>
  )
}
