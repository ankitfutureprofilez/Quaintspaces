import React from 'react'
import Heading from '../elements/Heading'
import Button from '../elements/Button'
import Link from 'next/link'
export default function Account() {
  return (
    <>

      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          <Heading text={"Account"} />
          <Button text={"Logout"} design={"font-inter text-base font-medium leading-tight text-center text-black w-52 border-2 border-black p-4 rounded-full"} />
        </div>
      </div>

      <div className='container mx-auto'>

        <div className='border-b-[3px] border-1 border-solid  border-black'>
          <div>
          <svg width="34px" height="34px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
<path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#DCAC81" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<div>
  
<h1>My Booking</h1>
            <p>
              Manage  all booking here
            </p>
</div>
  
          </div>
          <div>
            <Link href={"/"}>
              <p>Learn More </p>
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" className="h-5 w-5 stroke-current text-black">
                <g fill="none">
                  <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136L20 4"></path>
                </g>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>

  )
}
