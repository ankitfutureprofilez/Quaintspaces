import React from "react";
import Layout from "../layout/Layout";
import Head from "next/head";

function index() {
  const data = [
      {
        "id": "1",
        "title": "Searching and Booking on QuaintSpaces",
        "subsections": [
          {
            "id": "1.1",
            "title": "Searching",
            "content": "You can search for Host Services by using criteria like the type of Host Service, type of listing, travel destination, travel dates, and number of guests. You can also use filters to refine your search results. Search results are based on their relevance to your search and other criteria. Relevance considers factors like price, availability, reviews, customer service and cancellation history, popularity, previous trips and saved Listings, Host requirements (e.g. minimum or maximum nights), and more. Learn more about search results in Section 5.3 and in our Help Center."
          },
          {
            "id": "1.2",
            "title": "Booking",
            "content": "When you book a Listing, you are agreeing to pay all charges for your booking including the Listing price, applicable fees like ’s service fee, offline fees, taxes and any other items identified during checkout (collectively, “Total Price”). If you choose to pay using a currency that differs from the currency set by the Host for their Listing, the price displayed to you is based on a currency conversion rate determined by us. When you receive the booking confirmation, a contract for Host Services (a \"Reservation\") is formed directly between you and the Host. In addition to these Terms, you will be subject to, and responsible for complying with, all terms of the Reservation, including without limitation, the cancellation policy and any other rules, standards, policies, or requirements identified in the Listing or during checkout that apply to the Reservation. It is your responsibility to read and understand these rules, standards, policies, and requirements prior to booking a Listing. Be aware that some Hosts work with a co-host or as part of a team to provide their Host Services."
          },
          {
            "id": "1.3",
            "title": "Accommodation Reservations",
            "content": "An Accommodation Reservation is a limited license to enter, occupy and use the Accommodation. The Host retains the right to re-enter the Accommodation during your stay, to the extent: (i) it is reasonably necessary, (ii) permitted by your contract with the Host, and (iii) permitted by applicable law. If you stay past checkout, the Host has the right to make you leave in a manner permitted by applicable law, including by imposing reasonable overstay penalties. You may not exceed the maximum number of allowed Guests."
          },
          {
            "id": "1.4",
            "title": "Reservations for Experiences and Other Host Services",
            "content": "An Experience or other Host Service Reservation entitles you to participate in, attend, or use that Experience or Host Service. You are responsible for confirming that you, and anyone you invite, meet minimum age, proficiency, fitness or other requirements. You are responsible for informing the Host of any medical or physical conditions, or other circumstances that may impact your ability to participate, attend or use the Experience or Host Service. Except where expressly authorized, you may not allow any person to join an Experience or other Host Service unless they are included as an additional guest during the booking process."
          }
        ]
      },
      {
        "id": "2",
        "title": "Cancellations, Reservation Issues, Refunds and Booking Modifications",
        "subsections": [
          {
            "id": "2.1",
            "title": "Cancellations, Reservation Issues, and Refunds",
            "content": "In general, if you cancel a Reservation, the amount refunded to you is determined by the cancellation policy that applies to that Reservation. But, in certain situations, other policies may take precedence and determine what amount is refunded to you. If something outside your control requires you to cancel a Reservation, you may be entitled to a partial or full refund under our Major Disruptive Events Policy. If the Host cancels, or you experience a Reservation Issue (as defined in our Rebooking and Refund Policy), you may be entitled to rebooking assistance or a partial or full refund under our Rebooking and Refund Policy. Different policies apply to certain categories of Listings; for example, Experiences Reservations are governed by the Experiences Guest Refund Policy. See each Additional Legal Term or Policy for details about what is covered, and what refund applies in each situation. You may appeal a decision by contacting our customer service."
          },
          {
            "id": "2.2",
            "title": "Booking Modifications",
            "content": "Hosts and Guests are responsible for any booking modifications they agree to make via the Platform or direct QuaintSpaces customer service to make on their behalf (\"Booking Modifications\"), and agree to pay any additional amounts, fees or taxes associated with any Booking Modification."
          }
        ]
      }
    ];
  
  return (
    <Layout>
       <Head>
          <title>Terms & Conditions - QS Jaipur</title>
        </Head>
      <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        {data &&
            data.map((item, index) => (
              <div key={index} className="prose">
          <h1 className="text-3xl font-bold mb-6">{item?.title}</h1>
          {item.subsections &&
                  item.subsections.map((data, index) => (
                    <>
                    <h2>{data?.title}</h2>
          <p>
          {data?.content}
          </p>
          </>
          ))}
        </div>
        ))}
      </div>
    </div>
    </Layout>
  );
}

export default index;
