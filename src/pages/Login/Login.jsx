import React from 'react'
import BasicCard from '../../components/card/card'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div> 
        <BasicCard></BasicCard>
        <Link to="/register"><button>click me to regicter</button></Link> 
    </div>
  )
}
