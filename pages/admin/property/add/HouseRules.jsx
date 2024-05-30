import React, { useState } from 'react';

const HouseRules = ({ petsAllowed, setPetsAllowed, eventsAllowed, setEventsAllowed, smokingAllowed, quietHours, setQuietHours, setSmokingAllowed, PhotographyAllowed, setPhotographyAllowed }) => {
  return (
    <div>
      <h2 className="text-left  font-bold text-2xl text-slate-900 mt-3 mb-4">House  Rules</h2>
      <p className="text-left  font-sm text-lg text-slate-500 mt-3 mb-4">
        Guests are expected to follow your rules and may be removed from Airbnb if they don't.
      </p>

      <div className='flex p-3 '>
        <label className='font-normal  text-right  text-lg text-slate-600 mt-3  mb-4' style={{ marginRight: '10px' }}>
          Pets allowed:
        </label>
        <span className="mt-4 mb-3" onClick={() => setPetsAllowed(1)} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: petsAllowed ? '2px solid black' : '2px solid transparent' }}>
            <path d="m10.5 1.939 1.061 1.061-7.061 7.061-.53-.531-3-3-.531-.53 1.061-1.061 3 3 5.47-5.469z" />
          </svg>
        </span>
        <span className="mt-4 mb-3" onClick={() => setPetsAllowed(0)} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: !petsAllowed ? '2px solid black' : '2px solid transparent' }}>
            <polygon points="9.595 1.345 10.655 2.405 7.06 6 10.655 9.595 9.595 10.655 6 7.06 2.405 10.655 1.345 9.595 4.939 6 1.345 2.405 2.405 1.345 6 4.939" />
          </svg>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label className='font-normal  text-right  text-lg text-slate-600 mt-3  mb-4' style={{ marginRight: '10px' }}>

          Events Allowed :
        </label>
        <span onClick={() => setEventsAllowed(1)} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: eventsAllowed ? '2px solid black' : '2px solid transparent' }}>
            <path d="m10.5 1.939 1.061 1.061-7.061 7.061-.53-.531-3-3-.531-.53 1.061-1.061 3 3 5.47-5.469z" />
          </svg>
        </span>
        <span onClick={() => setEventsAllowed(0)} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: !eventsAllowed ? '2px solid black' : '2px solid transparent' }}>
            <polygon points="9.595 1.345 10.655 2.405 7.06 6 10.655 9.595 9.595 10.655 6 7.06 2.405 10.655 1.345 9.595 4.939 6 1.345 2.405 2.405 1.345 6 4.939" />
          </svg>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label className='font-normal  text-right  text-lg text-slate-600 mt-3  mb-4' style={{ marginRight: '10px' }}>

          Quiet Hours:
        </label>
        <span onClick={() => setQuietHours(1)} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: quietHours ? '2px solid black' : '2px solid transparent' }}>
            <path d="m10.5 1.939 1.061 1.061-7.061 7.061-.53-.531-3-3-.531-.53 1.061-1.061 3 3 5.47-5.469z" />
          </svg>
        </span>
        <span onClick={() => setQuietHours(0)} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: !quietHours ? '2px solid black' : '2px solid transparent' }}>
            <polygon points="9.595 1.345 10.655 2.405 7.06 6 10.655 9.595 9.595 10.655 6 7.06 2.405 10.655 1.345 9.595 4.939 6 1.345 2.405 2.405 1.345 6 4.939" />
          </svg>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginBottom: '10px' }}>
        <label className='font-normal  text-right  text-lg text-slate-600 mt-3  mb-4' style={{ marginRight: '10px' }}>

          Smoking Allowed:
        </label>
        <span onClick={() => setSmokingAllowed(1)} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: smokingAllowed ? '2px solid black' : '2px solid transparent' }}>
            <path d="m10.5 1.939 1.061 1.061-7.061 7.061-.53-.531-3-3-.531-.53 1.061-1.061 3 3 5.47-5.469z" />
          </svg>
        </span>
        <span onClick={() => setSmokingAllowed(0)} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: !smokingAllowed ? '2px solid black' : '2px solid transparent' }}>
            <polygon points="9.595 1.345 10.655 2.405 7.06 6 10.655 9.595 9.595 10.655 6 7.06 2.405 10.655 1.345 9.595 4.939 6 1.345 2.405 2.405 1.345 6 4.939" />
          </svg>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <label className='font-normal  text-right  text-lg text-slate-600 mt-3  mb-4' style={{ marginRight: '10px' }}>

          Photography Allowed :
        </label>
        <span onClick={() => setPhotographyAllowed(1)} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: PhotographyAllowed ? '2px solid black' : '2px solid transparent' }}>
            <path d="m10.5 1.939 1.061 1.061-7.061 7.061-.53-.531-3-3-.531-.53 1.061-1.061 3 3 5.47-5.469z" />
          </svg>
        </span>
        <span onClick={() => setPhotographyAllowed(0)} style={{ cursor: 'pointer' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '12px', width: '12px', fill: 'currentcolor', marginRight: '5px', borderRadius: '50%', border: !PhotographyAllowed ? '2px solid black' : '2px solid transparent' }}>
            <polygon points="9.595 1.345 10.655 2.405 7.06 6 10.655 9.595 9.595 10.655 6 7.06 2.405 10.655 1.345 9.595 4.939 6 1.345 2.405 2.405 1.345 6 4.939" />
          </svg>
        </span>
      </div>
      {/* Repeat the same structure for other rules */}

    </div>
  );
}

export default HouseRules;
