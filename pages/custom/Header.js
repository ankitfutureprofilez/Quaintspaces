import React from 'react'
import Button from '../elements/Button'

export default function Header() {
  return (
    <div className='justify-center items-center flex flex-col hero-sec'>
      <h1>Live the luxury in jaipur</h1>
      <p>Book the most luxuries and aesthetically pleasing place, Jaipur city has to offer</p>
    <Button text={"Explore Apartments"} desgin={"uppercase"}/>
      {/* <button> EXPLORE APARTMENTS</button> */}
    </div>
  )
}
