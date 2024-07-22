import React, { useState } from 'react'
import { FaStar } from "react-icons/fa6";

export default function StartRating({ value, size, color }) {
    const [rating, setRating] = useState(["1", "2", "3", "4", "5"]);
    const starColor = color || "#efa3a3"; // Default color is green

    return (
        <div className='flex gap-0.5'>
            {rating && rating.map((r, i) => {
                return (
                    <FaStar
                        key={i}
                        size={size || '16'}
                        color={value > i ? starColor : "#ccc"}
                        variant="Bold"
                    />
                );
            })}
        </div>
    );
}
