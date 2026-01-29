import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/button/button'
import './style.css'
import Input from '../../components/input/input'
import Box from '@mui/material/Box'

export default function Login() {
  return (
    <Box className='main'>
      <Box className='form'>
        <h1>Login Page</h1> 
          <Input
            label="email"
            type="email"
          />
          <Input
            label="password"
            type="password"
          /> 
          <Link to="/register" >
            <Button className='button'
              text="Cleck me to Register"
            />
          </Link> 
      </Box>
    </Box>
  )
}
