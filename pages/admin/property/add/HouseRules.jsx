import React, { useState } from 'react';

const HouseRules = () => {
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [eventsAllowed, setEventsAllowed] = useState(false);
  const [smokingAllowed, setSmokingAllowed] = useState(false);
  const [quietHours, setQuietHours] = useState(false);
  const [commercialPhotographyAllowed, setCommercialPhotographyAllowed] = useState(false);
  const [numGuests, setNumGuests] = useState(1);
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  return (
    <div>
      <h1>House Rules</h1>

      <div>
        <label>
          Pets allowed:
          <span onClick={() => setPetsAllowed(!petsAllowed)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
            {petsAllowed ? '✓' : '✗'}
          </span>
        </label>
      </div>

      <div>
        <label>
          Events allowed:
          <span onClick={() => setEventsAllowed(!eventsAllowed)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
            {eventsAllowed ? '✓' : '✗'}
          </span>
        </label>
      </div>

      <div>
        <label>
          Smoking, vaping, e-cigarettes allowed:
          <span onClick={() => setSmokingAllowed(!smokingAllowed)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
            {smokingAllowed ? '✓' : '✗'}
          </span>
        </label>
      </div>

      <div>
        <label>
          Quiet hours:
          <span onClick={() => setQuietHours(!quietHours)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
            {quietHours ? '✓' : '✗'}
          </span>
        </label>
      </div>

      <div>
        <label>
          Commercial photography and filming allowed:
          <span onClick={() => setCommercialPhotographyAllowed(!commercialPhotographyAllowed)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
            {commercialPhotographyAllowed ? '✓' : '✗'}
          </span>
        </label>
      </div>

      <div>
        <label>
          Number of guests:
          <input 
            type="number" 
            value={numGuests} 
            onChange={(e) => setNumGuests(Number(e.target.value))} 
            min="1" 
            max="55" 
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <div>
        <label>
          Check-in time:
          <input 
            type="time" 
            value={checkInTime} 
            onChange={(e) => setCheckInTime(e.target.value)} 
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <div>
        <label>
          Check-out time:
          <input 
            type="time" 
            value={checkOutTime} 
            onChange={(e) => setCheckOutTime(e.target.value)} 
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>
    </div>
  );
}

export default HouseRules;
