import Link from "next/link";
import { useEffect, useState } from "react";

const PwaFooter = () => {
  const [showPWA, setShowPWA] = useState(false);

  useEffect(() => {
    // Check if the app is running as a PWA
    const isPWA = window.matchMedia("(display-mode: standalone)").matches;
    setShowPWA(isPWA);

    // Add scroll event listener to track scroll position
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      setShowPWA(scrollPercentage >= 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showPWA ? (
        <div className="fixed bottom-0 bg-white left-0 w-full z-100 px-4 py-6 items-center justify-center">
          <div className="flex justify-between font-medium">
            <Link href="/" className="mx-2">
              Home
            </Link>
            <Link href="/apartments" className="mx-2">
              Apartments
            </Link>
            <Link href="/account" className="mx-2">
              Account
            </Link>
            <Link href="/booking" className="mx-2">
              Bookings
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PwaFooter;
