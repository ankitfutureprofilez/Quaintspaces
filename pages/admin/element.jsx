import React from "react";
import PageNavbar, {
    PageNavbarIconButton,
    PageNavbarLeftContent,
    PageNavbarPrimaryButton,
    PageNavbarRightContent,
  } from "./components/layout/PageNavbar";
  import { Add, Notification, SearchNormal1, Setting4 } from "iconsax-react";

  export default function element() {
  return (
    <div>
      <PageNavbar>
        <PageNavbarLeftContent>
          <div className="border rounded-full w-10 h-10 all-center flex items-center justify-center">
            <Setting4 size={18} />
          </div>
          <div>
            <h1 className="text-md font-semibold text-gray-800">Property</h1>
          </div>
        </PageNavbarLeftContent>

        <PageNavbarRightContent>


          <PageNavbarIconButton>
            <SearchNormal1 size={16} />
          </PageNavbarIconButton>

          
          <PageNavbarIconButton>
            <Notification size={16} />
          </PageNavbarIconButton>


        </PageNavbarRightContent>


      </PageNavbar>

    </div>
  );}
