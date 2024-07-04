function Video({step1}) {
    return ( 
        <>
        <div className="">
        <h1 className="text-[18px] font-sans  font-medium text-[#222222] text-left md:font-bold mb-2">
        {step1?.title}
        </h1>
        <h2 classanme="text-[44px] font-sans  font-medium text-[#222222] text-left md:font-[500] mb-4">
          {step1?.description}
        </h2>
        <p classanme="text-[16px] font-sans  font-medium text-[#222222] text-left md:font-bold mb-2">
       {step1?.instructions}
        </p>
      </div>
      <div
        className="w-full aspect-video "
        style={{ marginLeft: "20px" }}
      >
        <div className="">
          <video
            className=""
            style={{ objectFit: "cover" }}
            autoPlay
            crossOrigin="anonymous"
            muted
            playsInline
            preload="auto"
          >
            <source src={step1?.source}/>
          </video>
        </div>
      </div>
        </>
     );
}

export default Video;