import React from 'react'

export default function ReasonToVisit() {
  const reasons = [
    "Smart Telivision",
    "Laundry",
    "Complimentary internet",
    "Speakers",
    "Ironing",
    "Microwave",
    "Geyser"
  ];
  return (
    <div className="visit-us-sec" style={{ backgroundImage: `url(/images/visitbg.jpg)` }}>
      <div className='container mx-auto'>
        <h2>Reason to Visit US</h2>
        <div className="smart-box">
          <div className="iteam">
            <h3>Smart television</h3>
          </div>
          <div className="iteam">
            <h3>Laundry</h3>
          </div>
          <div className="iteam">
            <h3>Complimentary internet</h3>
          </div>
          <div className="iteam">
            <h3>Speakers</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
