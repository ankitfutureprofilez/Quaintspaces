import React, { useState } from 'react'
import { FaStar } from "react-icons/fa6";

export default function StartRating({value, size}) {
    const [rateing, setRating] = useState(["1", "2", '3', "4", '5']);

  return (
    <>
    <div className='flex'>
        {rateing && rateing.map((r, i)=>{ 
            return <FaStar size={size || '16'} color={ value > i ?  "#ffc107" : "#ccc" } variant="Bold"/>
        })}
    </div>
    </>
  )
}
