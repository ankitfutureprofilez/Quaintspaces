function RadialProgress({ progress }) {
    const dashOffset = ((100 - progress) / 100) * 502.65; 

    return (
        <div className="relative flex items-center justify-center">
            <span className="absolute text-gray-800 font-bold">{progress}%</span>
            <svg width="80" height="80" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M160 80C160 124.183 124.183 160 80 160C35.8172 160 0 124.183 0 80C0 35.8172 35.8172 0 80 0C124.183 0 160 35.8172 160 80ZM16 80C16 115.346 44.6538 144 80 144C115.346 144 144 115.346 144 80C144 44.6538 115.346 16 80 16C44.6538 16 16 44.6538 16 80Z" fill="#EEEFF3" />
                <path
                    d="M80.0002 0C93.6881 1.63227e-07 107.147 3.51209 119.09 10.2003C131.033 16.8885 141.059 26.5292 148.211 38.2001C155.363 49.871 159.401 63.1818 159.938 76.8592C160.476 90.5366 157.495 104.123 151.281 116.319C145.066 128.515 135.827 138.913 124.446 146.518C113.065 154.122 99.9227 158.679 86.2769 159.753C72.6311 160.827 58.938 158.382 46.5074 152.651C34.0768 146.921 23.3244 138.097 15.2788 127.023L28.2231 117.618C34.6595 126.477 43.2614 133.537 53.2059 138.121C63.1505 142.706 74.1049 144.662 85.0216 143.803C95.9382 142.944 106.452 139.298 115.557 133.214C124.662 127.13 132.053 118.812 137.025 109.055C141.996 99.2985 144.381 88.4293 143.951 77.4874C143.521 66.5454 140.291 55.8968 134.569 46.5601C128.848 37.2234 120.826 29.5108 111.272 24.1603C101.718 18.8097 90.9505 16 80.0002 16V0Z" 
                    stroke="#7B6CF0"
                    strokeWidth="16"
                    strokeDasharray="502.65" 
                    strokeDashoffset={dashOffset} 
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
}

export default RadialProgress;
