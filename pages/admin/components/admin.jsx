import React from 'react';
import LocalToken from '../../../hooks/LocalToken';
import Listing from '../api/Listing'

async function verifylogin (setAuth) { 
    const webtoken = LocalToken('Admintoken');
    if(webtoken){
      const main = new Listing;
      const response =  main.Adminprofile();
      response.then((res) => {
        if (res.data.status) {
          setAuth(res.data.data);
        } 
      }).catch((error) => {
        console.log("error", error);
      });
    }
  }

const admin = () => {
  return (
    <div>
    </div>
  );
}

export { admin, verifylogin };