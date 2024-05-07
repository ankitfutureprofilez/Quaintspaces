function RadialProgress({ progress }) {
  // Calculate the dash offset based on the progress percentage
  const dashOffset = ((100 - progress) / 100) * 251.2; // Assuming a radius of 40

  return (
    <div className="relative w-28 h-28">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        {/* Progress circle */}
        <circle
          className="text-indigo-500 progress-ring__circle stroke-current"
          strokeWidth="10"
          stroke-linecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke-dasharray="251.2"
          stroke-dashoffset={`calc(251.2 - (251.2 * ${progress}) / 100)`}
          transform="rotate(-90 50 50)" // Rotate the circle to start from the top
        ></circle>
        {/* Center text */}
        <text
          x="50"
          y="50"
          // font-family="Verdana"
          font-size="16"
          text-anchor="middle"
          alignment-baseline="middle"
          className="font-bold"
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
}

export default RadialProgress;
