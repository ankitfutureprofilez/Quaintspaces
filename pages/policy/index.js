import React from "react";
import Layout from "../layout/Layout";

function index() {
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="prose">
          <p>
            [Your Company Name] ("we", "us", or "our") operates the [Your
            Website URL] website (the "Service"). This page informs you of our
            policies regarding the collection, use, and disclosure of personal
            data when you use our Service and the choices you have associated
            with that data.
          </p>

          <h2>1. Information Collection and Use</h2>
          <p>
            We collect several different types of information for various
            purposes to provide and improve our Service to you.
          </p>

          <h2>2. Types of Data Collected</h2>
          <p>
            Personal Data
            <br />
            While using our Service, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you ("Personal Data"). Personally identifiable information
            may include, but is not limited to:
            <ul>
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Cookies and Usage Data</li>
            </ul>
          </p>

          <h2>3. Use of Data</h2>
          <p>
            We use the collected data for various purposes:
            <ul>
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer care and support</li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </p>

          <h2>4. Disclosure of Data</h2>
          <p>
            We may disclose your Personal Data in the good faith belief that
            such action is necessary to:
            <ul>
              <li>To comply with a legal obligation</li>
              <li>To protect and defend the rights or property of [Your Company
                Name]</li>
              <li>To prevent or investigate possible wrongdoing in connection
                with the Service</li>
              <li>To protect the personal safety of users of the Service or the
                public</li>
              <li>To protect against legal liability</li>
            </ul>
          </p>

          <h2>5. Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no
            method of transmission over the Internet, or method of electronic
            storage is 100% secure.
            </p>
            </div>
            </div>
            </div>
    </Layout>
  );
}

export default index;
