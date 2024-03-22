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
            <h1 className="text-sm font-semibold text-gray-800">Property</h1>
            <p className="text-xs font-medium text-gray-500">
              Add your property to here
            </p>
          </div>
        </PageNavbarLeftContent>

        <PageNavbarRightContent>
          <PageNavbarIconButton>
            <SearchNormal1 size={16} />
          </PageNavbarIconButton>
          <PageNavbarIconButton>
            <Notification size={16} />
          </PageNavbarIconButton>
          <PageNavbarPrimaryButton>
            <Add size={16} />
            <span className="hidden md:inline">Add integration</span>
          </PageNavbarPrimaryButton>
        </PageNavbarRightContent>
      </PageNavbar>

    </div>
  );}
