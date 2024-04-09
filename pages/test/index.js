import React from 'react'

export default function index() {
  return (
    <div>
         {images.map((reason, index) => (
                <div className="item flex-shrink-0 mx-2 relative transition-transform duration-500 ease-in-out transform" key={index}>
                  <Image src={reason.src} alt={reason.alt} className="" />
                  <div className="w-full py-4">
                    <h2 className="location-name">{reason.text}</h2>
                  </div>
                </div>
            ))}
    </div>
  )
}
