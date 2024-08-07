// components/ErrorPage.js

import { useRouter } from "next/router";
import Image from "next/image"

const NoRecord = ({heading, content}) => {
    const router =useRouter();
    return (
      <div className="empty-state">
      <div className="empty-state__content">
        <div className="empty-state__icon ">
          <Image
            src="https://th.bing.com/th/id/OIP.N0gCnBAfUaHLWOVZ8v9_PgHaHa?rs=1&pid=ImgDetMain"
            alt="No data"
            width={100}
            height={100}
          />
        </div>
        <div className="!text-xl mb-2  mt-2 uppercase">
          Result not found !! 
        </div>
        <button onClick={() => { router.back()}} className="mt-2 sm:w-full lg:w-auto my-2 filter btn">
          Take me there!
        </button>
      </div>
    </div>
    
                  
              
      );
  };
  
  export default NoRecord;
  