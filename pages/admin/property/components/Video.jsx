function Video({step1}) {
    return ( 
        <>
        <div className="w-full md:w-8/12">
        <h1 className="text-[16px] lg:text-[18px] font-sans  font-medium text-[#222222] text-left md:font-bold mb-2">
        {step1?.title}
        </h1>
        <h2 className=" text-2xl  lg:text-[34px]  xl:text-[42px] lg:leading-[40px] lg:leading-[50px] font-sans  font-medium text-[#222222] text-left md:font-[500] mb-4">
          {step1?.description}
        </h2>
        <p clasName="tex-sm md:text-[16px] font-sans  font-medium text-[#222222] text-left md:font-bold mb-2">
       {step1?.instructions}
        </p>
      </div>
      <div
        className="w-full aspect-video md:w-4/12 pl-6 "
        
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