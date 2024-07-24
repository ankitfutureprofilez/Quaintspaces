import React, { useEffect, useState } from "react";
import Heart from "../../../public/_svgs/Heart";
import LeftArrow2 from "../../../public/_svgs/LeftArrow2";
import RightArrow from "../../../public/_svgs/RightArrow";
import Times from "../../../public/_svgs/Times";
import Image from "next/image";

const ImageViewer = ({ selectedImage, isSaved, images, setImageViewer }) => {
  const [counter, setCounter] = useState(selectedImage);
  const [currrentImage, setCurrentImage] = useState(images[selectedImage]);

  useEffect(() => {
    setCurrentImage(images[counter]);
  }, [counter]);
  return (
    <section className="fixed top-0 left-0 w-full h-full z-40 bg-black p-2 select-none">
     <header className="flex items-center justify-between absolute top-0 left-0 z-10 w-full p-4 bg-[#0002]">
       
        <p className="text-md text-white font-medium">
          {counter + 1} / { images && images?.length}
        </p>
        <button
          onClick={() => setImageViewer(false)}
          className="bg-black text-white hover:bg-gray-600 flex items-center justify-center gap-2 font-semibold px-4 py-2 rounded-md"
        >
          <Times />
          <span className="tracking-2">Close</span>
        </button>
      </header>

      <main className=" w-full h-full flex items-center justity-center">
        <div className=" rounded-md mx-auto ">
          
          <Image blurDataURL={`${currrentImage?.image_url}?q=1`} placeholder="blur"
                  src={currrentImage?.image_url}
                  className="rounded-md w-full h-full object-cover "
                  alt="" layout="responsive" width="1000" height="1000"
                  loading="lazy"
                />
        </div>
        {counter >= 1 && (
          <button
            onClick={() => setCounter(counter >= 1 ? counter - 1 : counter)}
            type="button"
            className=" hover:bg-gray-400 hover:bg-opacity-40 bg-white rounded-full absolute top-[50%] z-[999] -translate-y-1/2 left-6 flex items-center justify-center w-10 h-10 border border-borderColor"
          >
            <LeftArrow2 color={"black"} />
          </button>
        )}
        {counter < images.length - 1 && (
          <button
            onClick={() =>
              setCounter(counter < images.length - 1 ? counter + 1 : counter)
            }
            type="button"
            className=" hover:bg-gray-400 hover:bg-opacity-40 bg-white rounded-full absolute top-[50%] z-[999] -translate-y-1/2 right-6 flex items-center justify-center w-10 h-10 border border-borderColor"
          >
            <RightArrow color={"black"} />
          </button>
        )}
      </main>
    </section>
  );
};

export default ImageViewer;