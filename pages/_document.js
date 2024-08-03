import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        /> 
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
        ></link>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
        <meta name="theme-color" content="#ffffff" />

        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="description"
            content="Quaint Spaces offers the best houses at the most affordable rates. We are known for providing exceptional service to our customers."
          />
          <meta
            name="keywords"
            content="Quaint Spaces, Quaintstay Jaipur, Property, Rental, House, Home, Apartment, Vacation Rental, Accommodation, Rent, Real Estate, Booking, Lease, Holiday Home, Furnished Rentals, Short Term Rentals, Long Term Rentals, Room Rental, Sublet, Tenant, Landlord, Property Management, Amenities, Location, Neighborhood, Cozy, Comfortable, Affordable, Luxurious, Modern, Stylish, Spacious, Convenient, Safe, Secure, Pet-friendly, Family-friendly, Fully Equipped, Fully Furnished, Utilities Included, Internet, Parking, Laundry, Amenities, Near Me, Explore, Discover, Staycation"
          />
          <meta name="googlebot" content="index, follow" />
          <meta name="robots" content="index, follow" />
      </Head>
      <body>
        <Main />
        <NextScript /> 
      </body>
    </Html>
  );
}
