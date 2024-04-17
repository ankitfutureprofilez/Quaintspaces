import React, { useState } from 'react'
import { Star1 } from 'iconsax-react';

export default function StartRating({value, size}) {
    const [rateing, setRating] = useState(["1", "2", '3', "4", '5']);

  return (
    <>
    <div className='flex'>
        {rateing && rateing.map((r, i)=>{ 
            return <Star1 size={size || '16'} color={ value > i ?  "#ffc107" : "#ccc" } variant="Bold"/>
        })}
    </div>
    </>
  )
}
