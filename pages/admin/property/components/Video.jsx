function Video({step1}) {
    console.log("Step1",step1)
    return ( 
        <>
        <div className="">
        <h1 className="text-base font-sans  font-medium text-black-100 text-left md:font-bold mb-2">
        {step1?.title}
        </h1>
        <h2 classanme="text-3xl  font-sans text-left text-gray-600 mt-4 font-semibold md:font-bold mb-8">
          {step1?.description}
        </h2>
        <p classanme="text-lg font-sans text-left text-gray-600  font-normal md:font-bold mb-2">
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