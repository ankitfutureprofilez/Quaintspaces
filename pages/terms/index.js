import React from "react";
import Layout from "../layout/Layout";
import Head from "next/head";

function index() {
  return (
    <Layout>
       <Head>
          <title>Terms & Conditions - QS Jaipur</title>
        </Head>
      <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <div className="prose">
          <h2>1. Introduction</h2>
          <p>
            Welcome to our Property Booking Website ("Website"). This Website
            is owned and operated by [Your Company Name].
          </p>

          <h2>2. Acceptance of Terms</h2>
          <p>
            By using our Website, you agree to be bound by these Terms and
            Conditions, whether or not you register as a user.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            To access certain features of the Website, you may be required to
            create an account.
          </p>

          <h2>4. Property Listings</h2>
          <p>
            We aim to provide accurate and up-to-date information about the
            properties listed on our Website. However, we cannot guarantee the
            accuracy, completeness, or reliability of any information provided.
          </p>

          <h2>5. Booking and Payment</h2>
          <p>
            By making a booking through our Website, you agree to abide by the
            terms and conditions set forth by the property owner or manager.
            Payment terms and cancellation policies may vary between
            properties.
          </p>

          <h2>6. User Conduct</h2>
          <p>
            You agree not to use our Website for any unlawful or prohibited
            purpose, or to violate any laws in your jurisdiction.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content and materials on the Website are the property of [Your
            Company Name] or its licensors and are protected by copyright and
            other intellectual property laws.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            [Your Company Name] shall not be liable for any direct, indirect,
            incidental, consequential, or punitive damages arising out of your
            use of or inability to use the Website.
          </p>

          <h2>9. Privacy Policy</h2>
          <p>
            Our Privacy Policy governs the collection, use, and disclosure of
            your personal information. By using our Website, you consent to the
            terms of our Privacy Policy.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of [Your Jurisdiction], without regard to
            its conflict of law provisions.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at [Your Contact Email].
          </p>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default index;
