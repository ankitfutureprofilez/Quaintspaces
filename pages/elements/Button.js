import React from 'react'
import { Link } from 'next/link';

export default function Button({text, desgin}) {
  return (
    <div>
       <button className={desgin}> {text}</button>
    </div>


  )
}




// .smart-box .iteam {
//     /* width: 25%; */
//     /* padding: 0 15px; */
// }


// .smart-box .iteam {
//     height: 136px;
//     width: 100%;
//     background: #fff;
//     display: flex;
//     align-items: center;
//     justify-content: space-evenly;
//     padding: 0 15px;
//     box-shadow: 0px 50px 40px -30px #B2958433;
// }


// .smart-box .iteam h3 {
//     font-family: 'NewYork';
//     font-size: 24px;
//     font-weight: 400;
//     line-height: 29px;
//     letter-spacing: 0em;
//     text-align: center;
//     color: #3F2A17;
// }