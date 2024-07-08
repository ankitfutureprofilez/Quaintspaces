function List() {
    return (  
        <div className="bg-white rounded-lg list-gstr overflow-hidden flex">
      <div className="w-4/12 max-h-[300px]">
        <img
          src="https://a0.muscache.com/im/pictures/miso/Hosting-1132333668648668973/original/7d7ec22c-ef64-4825-a2b1-67031a656125.jpeg?im_w=960" // Replace with actual image URL
          alt="Banipark Apartment"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="w-8/12 p-6">
        <h2 className="text-[22px] font-[600] text-[#3F2A17] mb-[10px]">Banipark Apartment</h2>
        <p className="text-[16px] font-[400] text-[#666360] uppercase mb-[15px]">From Golden Oak, Banipark, Jaipur</p>
        
        <div className="flex mb-[15px]">
          <div className=" mb-2 pr-[40px]">
          <h3 className="text-[#666360] font-[400] text-[13px]">Bedrooms</h3>
            <p className="text-[#666360] font-[700] text-[16px]">2 </p>
          </div>
          <div className=" mb-2 px-[40px] border-x">
            <h3 className="text-[#666360] font-[400] text-[13px]">Bedrooms</h3>
            <p className="text-[#666360] font-[700] text-[16px]">2 </p>
          </div>
          <div className=" mb-2 pl-[40px]">
          <h3 className="text-[#666360] font-[400] text-[13px]">Bedrooms</h3>
            <p className="text-[#666360] font-[700] text-[16px]">2 </p>
          </div>
        </div>
        
        <p className="text-[#666360] text-[16px]">{`Our place is located in the heart of Jaipur. Quaint Stay Jaipur apartment offers luxe amenities from a smart television set to a fully equipped kitchen. It is sure to bring in vacation vibes with its muted neutral tones teamed with soft hues & floral motifs handprinted on the walls, inspired by the pink city.`}</p>
      </div>
    </div>
    );
}

export default List;