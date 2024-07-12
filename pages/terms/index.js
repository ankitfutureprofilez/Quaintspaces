import React from "react";
import Layout from "../layout/Layout";
import Head from "next/head";

function index() {
  const data = [
    {
      id: "1",
      title: "Searching and Booking on QuaintSpaces",
      subsections: [
        {
          id: "1.1",
          title: "Searching",
          content:
            "You can search for Host Services by using criteria like the type of Host Service, type of listing, travel destination, travel dates, and number of guests. You can also use filters to refine your search results. Search results are based on their relevance to your search and other criteria. Relevance considers factors like price, availability, reviews, customer service and cancellation history, popularity, previous trips and saved Listings, Host requirements (e.g. minimum or maximum nights), and more. Learn more about search results in Section 5.3 and in our Help Center.",
        },
        {
          id: "1.2",
          title: "Booking",
          content:
            'When you book a Listing, you are agreeing to pay all charges for your booking including the Listing price, applicable fees like ’s service fee, offline fees, taxes and any other items identified during checkout (collectively, “Total Price”). If you choose to pay using a currency that differs from the currency set by the Host for their Listing, the price displayed to you is based on a currency conversion rate determined by us. When you receive the booking confirmation, a contract for Host Services (a "Reservation") is formed directly between you and the Host. In addition to these Terms, you will be subject to, and responsible for complying with, all terms of the Reservation, including without limitation, the cancellation policy and any other rules, standards, policies, or requirements identified in the Listing or during checkout that apply to the Reservation. It is your responsibility to read and understand these rules, standards, policies, and requirements prior to booking a Listing. Be aware that some Hosts work with a co-host or as part of a team to provide their Host Services.',
        },
        {
          id: "1.3",
          title: "Accommodation Reservations",
          content:
            "An Accommodation Reservation is a limited license to enter, occupy and use the Accommodation. The Host retains the right to re-enter the Accommodation during your stay, to the extent: (i) it is reasonably necessary, (ii) permitted by your contract with the Host, and (iii) permitted by applicable law. If you stay past checkout, the Host has the right to make you leave in a manner permitted by applicable law, including by imposing reasonable overstay penalties. You may not exceed the maximum number of allowed Guests.",
        },
        {
          id: "1.4",
          title: "Reservations for Experiences and Other Host Services",
          content:
            "An Experience or other Host Service Reservation entitles you to participate in, attend, or use that Experience or Host Service. You are responsible for confirming that you, and anyone you invite, meet minimum age, proficiency, fitness or other requirements. You are responsible for informing the Host of any medical or physical conditions, or other circumstances that may impact your ability to participate, attend or use the Experience or Host Service. Except where expressly authorized, you may not allow any person to join an Experience or other Host Service unless they are included as an additional guest during the booking process.",
        },
      ],
    },
    {
      id: "2",
      title:
        "Cancellations, Reservation Issues, Refunds and Booking Modifications",
      subsections: [
        {
          id: "2.1",
          title: "Cancellations, Reservation Issues, and Refunds",
          content:
            "In general, if you cancel a Reservation, the amount refunded to you is determined by the cancellation policy that applies to that Reservation. But, in certain situations, other policies may take precedence and determine what amount is refunded to you. If something outside your control requires you to cancel a Reservation, you may be entitled to a partial or full refund under our Major Disruptive Events Policy. If the Host cancels, or you experience a Reservation Issue (as defined in our Rebooking and Refund Policy), you may be entitled to rebooking assistance or a partial or full refund under our Rebooking and Refund Policy. Different policies apply to certain categories of Listings; for example, Experiences Reservations are governed by the Experiences Guest Refund Policy. See each Additional Legal Term or Policy for details about what is covered, and what refund applies in each situation. You may appeal a decision by contacting our customer service.",
        },
        {
          id: "2.2",
          title: "Booking Modifications",
          content:
            'Hosts and Guests are responsible for any booking modifications they agree to make via the Platform or direct QuaintSpaces customer service to make on their behalf ("Booking Modifications"), and agree to pay any additional amounts, fees or taxes associated with any Booking Modification.',
        },
      ],
    },
    {
      id: "3",
      title: "Your Responsibilities.",
      subsections: [
        {
          content:
            "You are responsible for your own acts and omissions and are also responsible for the acts and omissions of anyone you invite to join or provide access to any Accommodation, all areas and facilities where the Accommodation is located that the Host and Guest are legally entitled to use in connection with the Accommodation (“Common Areas”), or any Experience or other Host Service. For example, this means: (i) you are responsible for leaving an Accommodation (and related personal property) or Common Areas in the condition it was in when you arrived, (ii) you are responsible for paying all reasonable Damage Claim amounts, and (iii) you must act with integrity, treat others with respect and comply with applicable laws at all times. If you are booking for an additional guest who is a minor or if you bring a minor to a Host Service, you must be legally authorized to act on behalf of the minor and you are solely responsible for the supervision of that minor.",
        },
        {
          id: "5.3",
          title: "Search Results.",
          content:
            "The ranking and display of Listings in search results on the QuaintSpaces Platform depends on a variety of factors, including these main parameters:",
        },
      ],
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Terms & Conditions - QS Jaipur</title>
      </Head>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold">Terms and Conditions</h1>
          <div className="prose">
            <h1 className="text-xl font-bold my-6">
              1. Searching and Booking on QuaintSpaces.
            </h1>
            <div className="mb-2">
              <h2>1.1 Searching.</h2>
              <p>
                You can search for Host Services by using criteria like the type
                of Host Service, type of listing, travel destination, travel
                dates, and number of guests. You can also use filters to refine
                your search results. Search results are based on their relevance
                to your search and other criteria. Relevance considers factors
                like price, availability, reviews, customer service and
                cancellation history, popularity, previous trips and saved
                Listings, Host requirements (e.g. minimum or maximum nights),
                and more. Learn more about search results in Section 5.3 and in
                our Help Center.
              </p>
            </div>
            <div className="mb-2">
              <h2>1.2 Booking.</h2>
              <p>
                When you book a Listing, you are agreeing to pay all charges for
                your booking including the Listing price, applicable fees like
                ’s service fee, offline fees, taxes and any other items
                identified during checkout (collectively, “Total Price”). If you
                choose to pay using a currency that differs from the currency
                set by the Host for their Listing, the price displayed to you is
                based on a currency conversion rate determined by us. When you
                receive the booking confirmation, a contract for Host Services
                (a "Reservation") is formed directly between you and the Host.
                In addition to these Terms, you will be subject to, and
                responsible for complying with, all terms of the Reservation,
                including without limitation, the cancellation policy and any
                other rules, standards, policies, or requirements identified in
                the Listing or during checkout that apply to the Reservation. It
                is your responsibility to read and understand these rules,
                standards, policies, and requirements prior to booking a
                Listing. Be aware that some Hosts work with a co-host or as part
                of a team to provide their Host Services.
              </p>
            </div>
            <div className="mb-2">
              <h2>1.3 Accommodation Reservations.</h2>
              <p>
                An Accommodation Reservation is a limited license to enter,
                occupy and use the Accommodation. The Host retains the right to
                re-enter the Accommodation during your stay, to the extent: (i)
                it is reasonably necessary, (ii) permitted by your contract with
                the Host, and (iii) permitted by applicable law. If you stay
                past checkout, the Host has the right to make you leave in a
                manner permitted by applicable law, including by imposing
                reasonable overstay penalties. You may not exceed the maximum
                number of allowed Guests.
              </p>
            </div>
            <div className="mb-2">
              <h2>1.4 Reservations for Experiences and Other Host Services.</h2>
              <p>
                An Experience or other Host Service Reservation entitles you to
                participate in, attend, or use that Experience or Host Service.
                You are responsible for confirming that you, and anyone you
                invite, meet minimum age, proficiency, fitness or other
                requirements. You are responsible for informing the Host of any
                medical or physical conditions, or other circumstances that may
                impact your ability to participate, attend or use the Experience
                or Host Service. Except where expressly authorized, you may not
                allow any person to join an Experience or other Host Service
                unless they are included as an additional guest during the
                booking process.
              </p>
            </div>
          </div>
          <div className="prose">
            <h1 className="text-xl font-bold my-6">
              2. Cancellations, Reservation Issues, Refunds and Booking
              Modifications.
            </h1>
            <div className="mb-2">
              <h2>2.1 Cancellations, Reservation Issues, and Refunds.</h2>
              <p>
                In general, if you cancel a Reservation, the amount refunded to
                you is determined by the cancellation policy that applies to
                that Reservation. But, in certain situations, other policies may
                take precedence and determine what amount is refunded to you. If
                something outside your control requires you to cancel a
                Reservation, you may be entitled to a partial or full refund
                under our Major Disruptive Events Policy. If the Host cancels,
                or you experience a Reservation Issue (as defined in our
                Rebooking and Refund Policy), you may be entitled to rebooking
                assistance or a partial or full refund under our Rebooking and
                Refund Policy. Different policies apply to certain categories of
                Listings; for example, Experiences Reservations are governed by
                the Experiences Guest Refund Policy. See each Additional Legal
                Term or Policy for details about what is covered, and what
                refund applies in each situation. You may appeal a decision by
                by contacting our customer service.
              </p>
            </div>
            <div className="mb-2">
              <h2>2.2 Booking Modifications.</h2>
              <p>
                Hosts and Guests are responsible for any booking modifications
                they agree to make via the Platform or direct QuaintSpaces
                customer service to make on their behalf ("Booking
                Modifications"), and agree to pay any additional amounts, fees
                or taxes associated with any Booking Modification.
              </p>
            </div>
          </div>
          <div className="prose">
            <h1 className="text-xl font-bold my-6">
              3. Your Responsibilities.
            </h1>
            <div className="mb-2">
              <p>
                You are responsible for your own acts and omissions and are also
                responsible for the acts and omissions of anyone you invite to
                join or provide access to any Accommodation, all areas and
                facilities where the Accommodation is located that the Host and
                Guest are legally entitled to use in connection with the
                Accommodation (“Common Areas”), or any Experience or other Host
                Service. For example, this means: (i) you are responsible for
                leaving an Accommodation (and related personal property) or
                Common Areas in the condition it was in when you arrived, (ii)
                you are responsible for paying all reasonable Damage Claim
                amounts, and (iii) you must act with integrity, treat others
                with respect and comply with applicable laws at all times. If
                you are booking for an additional guest who is a minor or if you
                bring a minor to a Host Service, you must be legally authorized
                to act on behalf of the minor and you are solely responsible for
                the supervision of that minor.
              </p>
            </div>
            <div className="mb-2">
              <h2>5.3 Search Results.</h2>
              <p>
                The ranking and display of Listings in search results on the
                QuaintSpaces Platform depends on a variety of factors, including
                these main parameters:
              </p>
              <ol className="list-disc ml-5 mt-2">
                <li>
                  Guest search parameters (e.g. number of Guests, destination,
                  time and duration of the trip, price range),
                </li>
                <li>
                  Listing characteristics (e.g. location, price, calendar
                  availability, number and quality of images, reviews, ratings
                  and other quality signals, type or category of Host Service,
                  host status, length of time the Listing has been live on the
                  QuaintSpaces Platform, Guest engagement and popularity),
                </li>
                <li>
                  Guest experience (e.g. customer service and cancellation
                  history of the Host, ease of booking),
                </li>
                <li>
                  Host and Listing requirements (e.g. minimum or maximum nights,
                  booking cut-off time), and
                </li>
                <li>
                  Guest preferences and history (e.g. previous trips, viewed and
                  saved Listings, location from where the Guest is searching).
                </li>
              </ol>
              <p className="mt-2">
                Search results may be different on our mobile application than
                on our website, and may also differ in the map view.
                QuaintSpaces may allow Hosts to promote their Listings in search
                or elsewhere on the QuaintSpaces Platform by paying an
                additional fee. More information about the factors that
                determine how your Listing appears in search results, our
                current promotional programs (if any) and how we identify
                promoted Content can be found in our Help Center
              </p>
            </div>
            <div className="mb-2">
              <h2>5.4 Your Responsibilities.</h2>
              <p>
                You are responsible for your own acts and omissions and are also
                responsible for the acts and omissions of anyone you allow to
                participate in providing your Host Services. You are responsible
                for setting your price and establishing rules and requirements
                for your Listing. You must describe any and all fees and charges
                in your Listing description and may not collect any additional
                fees or charges outside the QuaintSpaces Platform except those
                expressly authorized by our Offline Fee Policy. Do not encourage
                Guests to create third-party accounts, submit reviews, provide
                their contact information, or take other actions outside the
                QuaintSpaces Platform in violation of our Off-Platform Policy.
              </p>
            </div>
            <div className="mb-2">
              <h2>6.1 Cancellations and Reservation Issues.</h2>
              <p>
                In general, if a Guest cancels a Reservation, the amount paid to
                you is determined by the cancellation policy that applies to
                that Reservation. As a host, you should not cancel on a Guest
                without a valid reason under our Major Disruptive Events Policy
                or applicable law. If you cancel on a Guest without such a valid
                reason, we may impose a cancellation fee and other consequences.
                If: (i) a Guest experiences a Reservation Issue (as defined by
                the Rebooking and Refund Policy), (ii) a Major Disruptive Event
                arises, or (iii) a Reservation is canceled under Section 13 of
                these Terms, the amount you are paid will be reduced by the
                amount we refund or otherwise provide to the Guest, and by any
                other reasonable costs we incur as a result of the cancellation.
                If a Guest receives a refund after you have already been paid,
                or the amount of the refund and other costs incurred by
                QuaintSpaces exceeds your payout, QuaintSpaces (via QuaintSpaces
                Payments) may recover that amount from you, including by
                deducting the refund against your future payouts. You agree that
                QuaintSpaces’s Rebooking and Refund Policy, Major Disruptive
                Events Policy, and these Terms preempt the cancellation policy
                you set in situations where they allow for the cancellation of a
                Reservation and/or the issuance of refunds to Guests. If we
                reasonably expect to provide a refund to a Guest under one of
                these policies, we may delay release of any payout for that
                Reservation until a refund decision is made. If you Host an
                Experience please note that the Experience Cancellation Policy,
                Experiences Guest Refund Policy and different cancellation fees
                and consequences apply to your Reservations. See each Policy for
                details about what is covered, and what your payout will be in
                each situation. You may appeal a decision by QuaintSpaces by
                contacting our customer service.
              </p>
            </div>
            <div className="mb-2">
              <h2>6.2 Booking Modifications.</h2>
              <p>
                Hosts and Guests are responsible for any Booking Modifications
                they agree to make via the QuaintSpaces Platform or direct
                QuaintSpaces customer service to make on their behalf, and agree
                to pay any additional amounts, fees or taxes associated with a
                Booking Modification.
              </p>
            </div>
          </div>
          <div className="prose">
            <h1 className="text-xl font-bold my-6">7. Taxes.</h1>
            <div className="mb-2">
              <h2>7.1 Host Taxes.</h2>
              <p>
                As a Host, you are responsible for determining and fulfilling
                your obligations under applicable laws to report, collect, remit
                or include in your price any applicable VAT or other indirect
                taxes, occupancy taxes, tourist, income or other taxes
                ("Taxes").
              </p>
            </div>
            <div className="mb-2">
              <h2>7.2 Collection and Remittance by QuaintSpaces.</h2>
              <p>
                In jurisdictions where QuaintSpaces facilitates the collection
                and/or remittance of Taxes on behalf of Hosts, you instruct and
                authorize QuaintSpaces to collect Taxes on your behalf, and/or
                to remit such Taxes to the relevant Tax authority. Any Taxes
                that are collected and/or remitted by QuaintSpaces are
                identified to Members on their transaction records, as
                applicable. QuaintSpaces may seek additional amounts from
                Members (including by deducting such amounts from future
                payouts) in the event that the Taxes collected and/or remitted
                are insufficient to fully discharge that Members’ tax
                obligations, and you agree that your sole remedy for Taxes
                collected by QuaintSpaces is a refund from the applicable Tax
                authority. You acknowledge and agree that we retain the right,
                with prior notice to affected Members, to cease the collection
                and remittance of Taxes in any jurisdiction for any reason.
              </p>
            </div>
            <div className="mb-2">
              <h2>7.3 Tax Information.</h2>
              <p>
                In certain jurisdictions, Tax regulations may require that we
                collect and/or report Tax information about you, or withhold
                Taxes from payouts to you, or both. If you fail to provide us
                with documentation that we determine to be sufficient to support
                any such obligation to withhold Taxes from payouts to you, we
                may withhold payouts up to the amount as required by law, until
                sufficient documentation is provided. You agree that
                QuaintSpaces may issue on your behalf invoices or similar
                documentation for VAT, GST, consumption or other Taxes for your
                Host Services to facilitate accurate tax reporting.
              </p>
            </div>
          </div>
          <div className="prose">
            <h1 className="text-xl font-bold my-6">8. Reviews.</h1>
            <p>
              After each Host Service, Guests and Hosts will have an opportunity
              to review each other. Your review must be accurate and may not
              contain any discriminatory, offensive, defamatory, or other
              language that violates these terms, applicable law, or our Content
              Policy or Review Policy. Reviews are not verified by QuaintSpaces
              for accuracy and may be incorrect or misleading.
            </p>
          </div>
          <div className="prose">
            <h1 className="text-xl font-bold my-6">9. Content.</h1>
            <p>
              Parts of the QuaintSpaces Platform enable you to provide feedback,
              text, photos, audio, video, information and other content
              (“Content”). By providing Content, in whatever form and through
              whatever means, you grant QuaintSpaces a non-exclusive, worldwide,
              royalty-free, sub-licensable and transferable license, for the
              term of the protection of the rights so licensed, to access, use,
              store, copy, modify, prepare derivative works of, distribute,
              publish, transmit, stream, broadcast, and otherwise exploit in any
              manner such Content to provide and/or promote the QuaintSpaces
              Platform, in any media or platform, known or unknown to date and
              in particular on Internet and social networks. If Content includes
              personal information, such Content will only be used for these
              purposes if such use complies with applicable data protection laws
              in accordance with our Privacy Policy. Where QuaintSpaces pays for
              the creation of Content or facilitates its creation, QuaintSpaces
              may own that Content, in which case supplemental terms or
              disclosures will say that. You are solely responsible for all
              Content that you provide and warrant that you either own it or are
              authorized to grant QuaintSpaces the rights described in these
              Terms. You are responsible and liable if any of your Content
              violates or infringes the intellectual property or privacy rights
              of any third party. Content must comply with our Content Policy
              and Nondiscrimination Policy, which prohibit, among other things,
              discriminatory, obscene, harassing, deceptive, violent and illegal
              content. You agree that QuaintSpaces may make available services
              or automated tools to translate Content and that your Content may
              be translated using such services or tools. QuaintSpaces does not
              guarantee the accuracy or quality of translations and Members are
              responsible for confirming the accuracy of such translations.
            </p>
          </div>
          <div className="prose">
            <h1 className="text-xl font-bold my-6">10. Fees.</h1>
            <p>
              QuaintSpaces may charge fees (and applicable Taxes) to Hosts and
              Guests for the right to use the QuaintSpaces Platform. Any
              applicable fees are disclosed to Hosts before publishing a listing
              and to Guests before making a booking. More information about when
              service fees apply and how they are calculated can be found on our
              Service Fees page. Except as otherwise provided on the
              QuaintSpaces Platform, service fees are non-refundable.
            </p>
          </div>
          <div className="prose">
            <h1 className="text-xl font-bold my-6">
              11. QuaintSpaces Platform Rules.
            </h1>
            <div className="mb-2">
              <h2>11.1 Rules.</h2>
              <p>
                You must follow these rules and must not help or induce others
                to break or circumvent these rules.
              </p>
              <ol className="mt-2 list-disc ml-5">
                <li>Act with integrity and treat others with respect</li>
                <ol
                  className="list-none mb-2 ml-5"
                  style={{ listStyleType: "circle" }}
                >
                  <li>
                    Do not lie, misrepresent something or someone, or pretend to
                    be someone else.
                  </li>
                  <li>
                    Be polite and respectful when you communicate or interact
                    with others.
                  </li>
                  <li>
                    Do not attempt to evade enforcement of these Terms, our
                    Additional Legal Terms, Policies and Standards, such as by
                    creating duplicate accounts or listings.
                  </li>
                  <li>
                    Follow our Nondiscrimination Policy and do not discriminate
                    against or harass others.
                  </li>
                </ol>
                <li>
                  Do not scrape, hack, reverse engineer, compromise or impair
                  the QuaintSpaces Platform
                </li>
                <ol
                  className="list-none mb-2 ml-5"
                  style={{ listStyleType: "circle" }}
                >
                  <li>
                    Do not use bots, crawlers, scrapers or other automated means
                    to access or collect data or other content from or otherwise
                    interact with the QuaintSpaces Platform.
                  </li>
                  <li>
                    Do not hack, avoid, remove, impair, or otherwise attempt to
                    circumvent any security or technological measure used to
                    protect the QuaintSpaces Platform or Content.
                  </li>
                  <li>
                    Do not decipher, decompile, disassemble or reverse engineer
                    any of the software or hardware used to provide the
                    QuaintSpaces Platform.
                  </li>
                  <li>
                    Do not take any action that could damage or adversely affect
                    the performance or proper functioning of the QuaintSpaces
                    Platform.
                  </li>
                </ol>
                <li>
                  Only use the QuaintSpaces Platform as authorized by these
                  Terms or another agreement with us
                </li>
                <ol
                  className="list-none mb-2 ml-5"
                  style={{ listStyleType: "circle" }}
                >
                  <li>
                    You may only use another Member’s personal information as
                    necessary to facilitate a transaction using the QuaintSpaces
                    Platform as authorized by these Terms.
                  </li>
                  <li>
                    Do not use the QuaintSpaces Platform, our messaging tools,
                    or Members’ personal information to send commercial messages
                    without their express consent.
                  </li>
                  <li>
                    You may use Content made available through the QuaintSpaces
                    Platform solely as necessary to enable your use of the
                    QuaintSpaces Platform as a Guest or Host.
                  </li>
                  <li>
                    Do not use Content unless you have permission from the
                    Content owner or the use is authorized by us in these Terms
                    or another agreement you have with us.
                  </li>
                  <li>
                    Do not request, make or accept a booking or any payment
                    outside of the QuaintSpaces Platform to avoid paying fees,
                    taxes or for any other reason. See our Offline Fee Policy
                    for exceptions.
                  </li>
                  <li>
                    Do not require or encourage Guests to open an account, leave
                    a review, or otherwise interact, with a third-party website,
                    application or service before, during or after a
                    Reservation, unless authorized by QuaintSpaces.
                  </li>
                  <li>
                    Do not engage in any practices that are intended to
                    manipulate our search algorithm.
                  </li>
                  <li>
                    Do not book Host Services unless you are actually using the
                    Host Services.
                  </li>
                  <li>
                    Do not use, copy, display, mirror or frame the QuaintSpaces
                    Platform, any Content, any QuaintSpaces branding, or any
                    page layout or design without our consent.
                  </li>
                </ol>
                <li>Honor your legal obligations</li>
                <ol
                  className="list-none mb-2 ml-5"
                  style={{ listStyleType: "circle" }}
                >
                  <li>
                    Understand and follow the laws that apply to you, including
                    privacy, data protection, and export laws.
                  </li>
                  <li>
                    If you provide us with someone else’s personal information,
                    you: (i) must do so in compliance with applicable law, (ii)
                    must be authorized to do so, and (iii) authorize us to
                    process that information under our Privacy Policy.
                  </li>
                  <li>
                    Read and follow our Terms, Additional Legal Terms, Policies
                    and Standards.
                  </li>
                  <li>
                    Do not organize or facilitate unauthorized parties or
                    events. You are responsible and liable for any party or
                    event during your Reservation that violates our rules for
                    parties and events, as incorporated by reference herein.
                  </li>
                  <li>
                    Do not use the name, logo, branding, or trademarks of
                    QuaintSpaces or others without permission, and only as set
                    forth in our Trademark Guidelines.
                  </li>
                  <li>
                    Do not use or register any domain name, social media handle,
                    trade name, trademark, branding, logo or other source
                    identifier that is confusingly similar to any QuaintSpaces
                    trademarks, logos or branding. See our Trademark Guidelines
                    for additional details.
                  </li>
                  <li>
                    Do not offer Host Services that violate the laws or
                    agreements that apply to you.
                  </li>
                  <li>
                    Do not offer or solicit prostitution or participate in or
                    facilitate human trafficking.
                  </li>
                </ol>
              </ol>
            </div>
            <div className="mb-2">
              <h2>11.2 Reporting Violations.</h2>
              <p>
                If you believe that a Member, Listing or Content poses an
                imminent risk of harm to a person or property, you should
                immediately contact local authorities before contacting
                QuaintSpaces. In addition, if you believe that a Member, Listing
                or Content has violated our Standards, you should report your
                concerns to QuaintSpaces. If you reported an issue to local
                authorities, QuaintSpaces may request a copy of that report.
                Except as required by law, we are not obligated to take action
                in response to any report.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default index;
