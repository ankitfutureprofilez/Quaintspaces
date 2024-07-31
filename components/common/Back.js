import React  from "react";
import { useRouter } from "next/router";

const Back = () => {
  const router = useRouter();
  return (
    <>
      <div className={"backtag cursor-pointer"} onClick={()=>router.back()} > 
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" 
        class="block fill-none h-6 w-6 me-2 stroke-black stroke-[3.3333]"><g fill="none"><path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path></g></svg>
      </div>
    </>
  );
};

export default Back;
