import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ClearCache(){
    
   const r = useRouter();

   useEffect(()=> { 
      // process.env.VERSION
      const v = typeof window !== 'undefined' ? localStorage.getItem('version') : null;
      if(v === undefined || v == '' || v != process.env.VERSION || '1.1.0'){
        console.log("version update")
        if('caches' in window){
            caches.keys().then((names) => {
               names.forEach(name => {
                  caches.delete(name);
               }); 
            });
         }
        localStorage.setItem('version', process.env.VERSION || '1.1.0');
      } else { 
        console.log("version updated already")
      } 
   }, [r.pathname]); 
 
   return <> 
   </>
}