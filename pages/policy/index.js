import React from "react";
import Layout from "../layout/Layout";
import Head from "next/head";
import Link from "next/link";

function index() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy - Quaint Spaces Jaipur</title>
      </Head>
      <style>{`
        .terms p, .terms li { 
          color:#828282; line-height: 27px;
        }
        .terms li, .terms ul { 
          margin-bottom:7px;
        }
        .terms h2, .terms h3 { 
          font-size:18px;
        }
      `}</style>
      <div className="terms bg-gray-100 min-h-screen">
        <div className="max-w-4xl lg:max-w-4xl mx-auto py-6 md:py-8 lg:py-12 px-4">
           
          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold my-2">Privacy Policy</h1>
            <div className="prose">
              
              
              <p  >
                Quaint Spaces exists to help build connections between people and make the world more open and inclusive. In short—to build a world where anyone can belong anywhere. We are a community built on trust. A fundamental part of earning that trust means being clear about how we use your information and protecting your human right to privacy.
              </p>
              <div>
                <h1 className="text-xl font-bold my-6">1. PERSONAL INFORMATION WE COLLECT</h1>

                <div className="mb-2">
                    <h2>1.1 Information Needed to Use the Quaint Spaces Platform</h2>
                  <p >
                    We collect personal information about you when you use the Quaint Spaces Platform. Without it, we may not be able to provide all services requested. This information includes:
                  </p>
                </div>
                <div className="ml-4">
                <div className="mb-2"> <h3>1.1.1 Contact, Account, and Profile Information</h3>
                  <p >
                    Such as your first name, last name, phone number, postal address, email address, date of birth, and profile photo, some of which will depend on the features you use.
                  </p>
                </div>

                <div className="mb-2">
                  <h3 >1.1.2 Identity Information</h3>
                  <p >
                    Where appropriate, we may ask you for an image of your government-issued ID (in accordance with applicable laws) or other verification information, and/or a selfie when we verify your ID. If a copy of your ID is provided to us, we will obtain information from your ID. See our Help Center article on
                    Verifying your identity.

                  </p>
                </div>


                <div className="mb-2">
                  <h3 >1.1.3 Payment Information</h3>
                  <p >
                    Such as payment account or bank account information. If you are not a Quaint Spaces user, we may receive payment information relating to you, such as when a Quaint Spaces user provides your payment card to complete a booking. See our Help Center article on
                    Paying and getting paid on behalf of someone else.

                  </p>

                </div>
                </div>
                <div className="mb-2">  <h2   >1.2 Information You Choose to Give Us</h2>
                  <p >
                    You can choose to provide us with additional personal information, including:
                  </p>
                </div>
                <div className="ml-4">
                <div className="mb-2"> <h3 >1.2.1 Additional Profile Information</h3>
                  <p >
                    Such as gender, preferred language(s), city, and personal description.
                  </p>
                </div>
                <div className="mb-2"> <h3 >1.2.2 Information About Others</h3>
                  <p >
                    Such as a payment instrument or contact information belonging to another person or information about a co-traveler. By providing us with personal information about others, you certify that you have permission to provide that information to Quaint Spaces for the purposes described in this Privacy Policy and you have shared the Quaint Spaces Privacy Policy with them.
                  </p>
                </div>
                <div className="mb-2"> <h3 >1.2.3 Biometric Information</h3>
                  <p >
                    Such as facial recognition data derived from photos and identification documents you submit for verification, where offered and with your consent where required by applicable law.
                  </p>
                </div>

                <div className="mb-2"> <h3 >1.2.4 Other Information</h3>
                  <p >
                    Such as when you fill in a form, add information to your account, respond to surveys, post to community forums, participate in promotions, communicate with Quaint Spaces Support and other Members, import or manually enter address book contacts, provide your address and/or geolocation, or share your experience with us. This may include health information if you choose to share it with us.
                  </p>
                </div>
                </div>


                <div className="mb-2">  <h2   >1.3 Information Automatically Collected by Using the Quaint Spaces Platform and Our Payment Services</h2>
                  <p >
                    When you use the Quaint Spaces Platform and Payment Services, we automatically collect certain information. This information may include:
                  </p>
                </div>
                <div className="ml-4">
                <div className="mb-2"> <h3 >1.3.1 Geolocation Information</h3>
                  <p >
                    Such as precise or approximate location determined from your IP address, mobile or other device’s GPS, or other information you share with us, depending on your device settings. We may also collect this information when you’re not using the app if you enable this through your settings or device permissions.
                  </p>
                </div>

                <div className="mb-2"> <h3 >1.3.2 Usage Information</h3>
                  <p >
                    Such as searches for Listings, bookings you have made, additional services you have added, access dates and times, the pages you’ve viewed or engaged with before or after using the Quaint Spaces Platform, and other actions on the Quaint Spaces Platform, including the pages or content you view and links you click to third-party applications. We may collect this information even if you haven’t created a Quaint Spaces account or logged in.
                  </p>
                </div>

                <div className="mb-2"> <h3 >1.3.3 Device Information</h3>
                  <p >
                    Such as IP address, hardware and software information, device information, device event information, unique identifiers, crash data, and read receipts. We may collect this information even if you haven’t created a Quaint Spaces account or logged in.
                  </p>
                </div>

                <div className="mb-2"> <h3 >1.3.4 Cookies and Similar Technologies</h3>
                  <p >
                    As Described in Our
                    Cookie Policy.

                  </p>
                </div>

                <div className="mb-2"> <h3 >1.3.5 Payment Transaction Information</h3>
                  <p >
                    Such as payment instrument used, date and time, payment amount, payment instrument expiration date and billing postcode, PayPal email address, IBAN information, your address, and other related transaction details.
                  </p>
                </div>
                </div>

                <div className="mb-2">  <h2   >1.4 Information We Collect from Third Parties</h2>
                  <p >
                    We may collect personal information from other sources, such as:
                  </p>
                </div>
                <div className="ml-4">
                <div className="mb-2"> <h3 >1.4.1 Third-Party Applications</h3>
                  <p >
                    If you choose to link, connect, or login to the Quaint Spaces Platform with a third-party service, such as Google, Facebook, and WeChat, you direct the service to send us information such as your registration, friends list, and profile information as controlled by that service or as authorized by you via your privacy settings at that service. If you choose to connect a smart lock to your Quaint Spaces account, we may collect information about the smart device, such as log or event information and device information.
                  </p>
                </div>

                <div className="mb-2"> <h3 >1.4.2 Background Information Providers</h3>
                  <p >
                    For Members in the United States, to the extent permitted by applicable laws, we may obtain, for example, reports of criminal records, sex offender registrations, and other information about you and/or your background. For Hosts in India, to the extent permitted by applicable laws, we may perform criminal background checks. For Members outside of the United States, to the extent permitted by applicable laws and with your consent where required, we may obtain police, background, or registered sex offender checks. We may use your information, including your full name and date of birth, to obtain such reports.
                  </p>
                </div>

                <div className="mb-2"> <h3 >1.4.3 Enterprise Product Invitations and Account Management</h3>
                  <p >
                    Organizations that use our Enterprise products may submit personal information to facilitate account management and invitations to use enterprise products.
                  </p>
                </div>

                <div className="mb-2"> <h3 >1.4.4 Referrals and Co-Travelers</h3>
                  <p >
                    If you are invited to the Quaint Spaces Platform, for example, as a co-traveler on a trip, the person who invited you can submit personal information about you.
                  </p>
                </div>

                <div className="mb-2"> <h3 >1.4.5 Guest Travel Insurance Partners</h3>
                  <p >
                    If you make a claim under a Guest Travel Insurance Policy, we may receive information regarding your claim in order to provide you with customer service and improve our platform.
                  </p>
                </div>

                <div className="mb-2"> <h3 >1.4.6 Complainants</h3>
                  <p >
                    If a Host, Guest, or any third party submits a complaint about you, we may receive information relating to the specific complaint made in order to understand and, where relevant, address the complaint.
                  </p>
                </div>

                <div className="mb-2"> <h3 >1.4.7 Financial Institutions</h3>
                  <p >
                    If you elect to pay with funds from your bank account, we may receive certain information from your financial institution, such as bank account details and account balance.
                  </p>
                </div>

                <div className="mb-2"> <h3 >1.4.8 Flexible Payment Plans and Financing Providers</h3>
                  <p >
                    If you elect to purchase a reservation and pay on an installment plan, we may receive certain information from the third-party provider, such as the payment schedule and actual payments on authorized payment plans.
                  </p>
                </div>
                <div className="mb-2"> <h3 >1.4.9 Other Sources</h3>
                  <p >
                    To the extent permitted by applicable law, we may receive additional information about you, such as
                    references

                    , demographic data, and information to help detect fraud and safety issues from (i) third-party service providers, other third parties, and/or partners, or (ii) Members and any other individuals, entities, and authorities, and combine it with information we have about you. For example, we may receive background check results or fraud warnings from identity verification service providers for use in our fraud prevention, security investigation, and risk assessment efforts. We may receive information about you and your activities on and off the Quaint Spaces Platform, including from users of Quaint Spaces, members of the public, or governmental, public, or tax authorities, or about your experiences and interactions from our partners. We may receive health information including, but not limited to, health information related to contagious diseases.
                  </p>
                </div>
                </div>
              </div>
              <div className=" max-w-4xl mx-auto">
                <div className="mb-2">  <h1 className="text-xl  font-bold my-6"     >2. HOW WE USE INFORMATION WE COLLECT.</h1>
                  <p >
                    We use personal information as outlined in this Privacy Policy. If you reside outside of the United States,
                    click here

                    to learn about our legal bases for collection and processing personal information.
                  </p>
                </div>
                <div className="mb-2"> <h2 >2.1 Provide, Improve, and Develop the Quaint Spaces Platform.</h2>
                  <p >We may process this information to:</p>
                </div>
                <ul className="list-disc list-inside mb-4">
                  <li>enable you to access the Quaint Spaces Platform and make and receive payments,</li>
                  <li>enable you to communicate with others,</li>
                  <li>process your request,</li>
                  <li>perform analytics, debug, and conduct research,</li>
                  <li>develop and improve our products and services,</li>
                  <li>provide customer service training,</li>
                  <li>send you messages, updates, security alerts, and account notifications,</li>
                  <li>process, handle, or assess insurance claims or similar claims,</li>
                  <li>determine your country of residence based on automated review of your account information and your interactions with the Quaint Spaces Platform,</li>
                  <li>personalize and customize your experience based on your interactions with the Quaint Spaces Platform, your search and booking history, your profile information and preferences, and other content you submit, and</li>
                  <li>enable your use of our products and accommodation services.</li>
                </ul>


                <div className="mb-2"> <h2>2.2 Safeguard the Quaint Spaces Platform and Community.</h2>
                  <p >We may process this information to:</p>
                </div>
                <ul className="list-disc list-inside mb-4">
                  <li>study and combat discrimination consistent with our

                    Nondiscrimination Policy

                    ,</li>
                  <li>detect, prevent, assess, and address fraud and security risks,</li>
                  <li>verify or authenticate information provided by you, including identity information, as described in Information Needed to Use the Quaint Spaces Platform,</li>
                  <li>conduct checks against databases and other information sources, including background checks,</li>
                  <li>comply with our legal obligations, protect the health and well-being of our Guests, Hosts, Hosts’ employees, and members of the public,</li>
                  <li>resolve disputes with our Members, including sharing information with your co-Host(s) or additional Guests about disputes related to your role as a co-Host(s) or additional Guests,</li>
                  <li>enforce our agreements with third parties,</li>
                  <li>determine eligibility for certain types of bookings, such as Instant Book,</li>
                  <li>comply with law, respond to legal requests, prevent harm, and protect our rights (see Comply with Law, Respond to Legal Requests, Prevent Harm, and Protect Our Rights),</li>
                  <li>enforce our

                    Terms

                    and other policies, such as our


                    Nondiscrimination Policy , and</li>
                  <li>assess or evaluate your interactions with the Quaint Spaces Platform and information obtained from third parties.</li>
                </ul>
                <p >
                  In certain cases, automated processes, which analyze your account and activities on the Quaint Spaces platform as well as information in relation to activities on and off the Quaint Spaces platform that can be associated with you, could restrict or suspend your access to the Quaint Spaces Platform if such processes detect activity that may pose a safety or other risk to Quaint Spaces, our community, or third parties. Learn more about how our system determines whether certain reservations may carry a higher risk for incidents here. If you would like to challenge decisions based on automated processes, please contact us via the Contact Information section.
                </p>

                <div className="mb-2 mt-2">
                  <h2 >2.3 Provide, Personalize, Measure, and Improve our Advertising and Marketing.</h2>
                  <p >We may process this information to:</p>
                </div>
                <ul className="list-disc list-inside mb-4">
                  <li>send you promotional and marketing messages, and other information,</li>
                  <li>show, personalize, measure, and improve our advertising on advertising platforms,</li>
                  <li>administer referral programs, rewards, surveys, sweepstakes, contests, or other promotional activities or events sponsored or managed by Quaint Spaces or its third-party partners,</li>
                  <li>analyze characteristics and preferences to send you promotional messages, marketing, advertising, and other information that we think might be of interest to you, and</li>
                  <li>invite you to events and relevant opportunities.</li>
                </ul>
                <div className="mb-2"> <h2>2.4 Analyze and Share Your Communications.</h2>
                  <p >
                    We may review, scan, or analyze your communications on the Quaint Spaces Platform for reasons outlined in the “How We Use Information We Collect” section of this policy, including fraud prevention, security investigations, risk assessment, regulatory compliance, product development, research, analytics, enforcing our Terms of Service, and customer support purposes. For example, as part of our fraud prevention efforts, we scan and analyze messages to mask contact information and references to other sites and, subject to applicable law, we scan and analyze all images uploaded by users to the Quaint Spaces platform in message threads, profiles, listings, and experiences for certain illegal or inappropriate activities – such as evidence of child exploitation – for the purpose of identifying and reporting content violations to appropriate authorities. In some cases, we may also scan, review, or analyze messages to debug, improve, and expand product offerings. We use automated methods where reasonably possible. Occasionally we may need to manually review communications, such as for fraud investigations and customer support, or to assess and improve the functionality of these automated tools. We will not review, scan, or analyze your messaging communications to send third-party marketing messages to you and we will not sell reviews or analyses of these communications. We may also share your communications as set out in the “Sharing and Disclosure” section.
                  </p>
                </div>


                <div className="mb-2"> <h2>2.5 Provide Payment Services.</h2>
                  <p >
                    Personal information is used to enable, or authorize third parties to use, Payment Services, such as to:
                  </p>
                </div>
                <ul className="list-disc list-inside mb-4">
                  <li>detect and prevent money laundering, fraud, abuse, and security incidents, as well as conduct risk assessments,</li>
                  <li>comply with legal and compliance obligations, such as anti-money laundering regulations and sanctions enforcement,</li>
                  <li>enforce the Payment Terms and other payment policies, and</li>
                  <li>provide and improve Payment Services.</li>
                </ul>
                <p className="!text-black mt-4"  >Last Updated: January 25, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default index;
