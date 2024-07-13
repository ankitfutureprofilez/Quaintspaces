import AdminLayout from "../../AdminLayout";
import { FaHouse } from "react-icons/fa6";
import Listing from "../../api/Listing";
import { useState, useEffect } from "react";
import { BsHouseAdd } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Modal from "../../hook/Modal";
import Image from "next/image";
import Property from "../add/Property";

function Index() {
  const Admin = "Admin name";
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isimage, setisimage] = useState(false);
  const [openAddPage, setOpenAddPage] = useState(false);
  const [record, setRecord] = useState([]);
  const [useExistingImages, setUseExistingImages] = useState(false);
  const [filteredRecord, setFilteredRecord] = useState([]);
  const [uuid, setuuid] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    loading: true,
    data: {},
  });
  const router = useRouter();
  //   console.log("uuid",uuid);
  useEffect(() => {
    const main = new Listing();
    main
      .Adminproperty()
      .then((res) => {
        const data = res?.data?.data;
        setRecord(res?.data?.data);
        let filteredListings = [];
        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item?.status !== 1) {
              filteredListings?.push(item);
            }
          });
        }
        if (filteredListings?.length > 0) {
          setFilteredRecord(filteredListings);
        } else {
          console.log("No listings match the status and step conditions.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setIsLoading(false);
      });
  }, []);

  const fetchProperty = async (uuid) => {
    if (uuid) {
      setLoading(true);
      const main = new Listing();
      try {
        const response = await main.viewproperty(uuid || "");
        setData({
          loading: false,
          data: response?.data?.data,
        });
      } catch (err) {
        setData({
          loading: true,
        });
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const duplicateProperty = async () => {
    fetchProperty(uuid);
    setIsLoading(false);
    setIsPopupOpen(false);
    setisimage(false);
    setOpenAddPage(true);
  };

  const handleEditEntireProperty = (uuid) => {
    router.push(`/admin/property/edit/${uuid}`);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleimagePopup = (id) => {
    setisimage(!isimage);
    setuuid(id);
    fetchProperty(id);
  };

  return (
    <AdminLayout heading="Properties List">
      {isLoading || openAddPage ? (
        openAddPage ? (
          <></>
        ) : (
          <div className="fixed top-0 left-0 w-full h-full bg-[#ffffff47] text-center flex justify-center items-center z-50">
            <p>Loading...</p>
          </div>
        )
      ) : (
        <div className="max-w-[600px] w-full py-4 md:py-8 mx-auto">
          <div className="">
            <h2 className="text-[22px] md:text-[28px] font-[550] text-[#222222] sm:mb-[20px]">
              Welcome back, {Admin}
            </h2>
            <p className="text-[16px] md:text-[20px] font-[500] text-black mb-[16px]">Finish your listing</p>
            <div>
              {filteredRecord &&
                filteredRecord.map((item, index) => (
                  <div
                    className="p-3 sm:p-[24px] border rounded-xl mb-2 flex items-center"
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditEntireProperty(item?.uuid)}
                  >
                    {item?.property_image[0]?.image_url ? (
                      <div className="w-[43px] h-[43px] object-cover">
                        <Image
                          width={100}
                          height={100}
                          layout="responsive"
                          src={item?.property_image[0]?.image_url}
                          alt="Property cover image"
                          onClick={() => {
                            toggleimagePopup();
                          }}
                          className="w-full !h-full object-cover"
                        />
                      </div>
                    ) : (
                      <FaHouse />
                    )}
                    <h2 className="text-[17px] sm:text-lg font-medium ml-4 heading-property">
                      {item.name || "please name "}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-4 md:mt-[60px]">
            <p className="text-[16px] md:text-[20px] font-[500] text-black mb-[16px]">
              Start a new listing
            </p>
            <div
              className="p-4 border-b mb-2 flex items-center relative"
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/admin/property/add");
              }}
            >
              <BsHouseAdd size={24} />

              <h2 className="text-lg font-medium ml-4 heading-property ">
                Create a new listing
              </h2>
              <svg
                className="absolute top-5 right-2"
                width="13"
                height="18"
                viewBox="0 0 25 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.0933685"
                  y="4.10052"
                  width="4.65944"
                  height="25.1483"
                  rx="2.32972"
                  transform="rotate(-61.7498 0.0933685 4.10052)"
                  fill="#A5A5A5"
                />
                <rect
                  x="4.82649"
                  y="29.0888"
                  width="4.59659"
                  height="25.1483"
                  rx="2.2983"
                  transform="rotate(-127.945 4.82649 29.0888)"
                  fill="#A5A5A5"
                />
              </svg>
            </div>
            <div
              className="p-4 border-b mb-2 flex items-center relative cursor-pointer"
              onClick={() => {
                togglePopup();
              }}
            >
              <IoCopyOutline size={24} />
              <h2 className="text-lg font-medium ml-4 heading-property">
                Dublicate an existing property
              </h2>
              <svg
                className="absolute top-5 right-2"
                width="13"
                height="18"
                viewBox="0 0 25 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.0933685"
                  y="4.10052"
                  width="4.65944"
                  height="25.1483"
                  rx="2.32972"
                  transform="rotate(-61.7498 0.0933685 4.10052)"
                  fill="#A5A5A5"
                />
                <rect
                  x="4.82649"
                  y="29.0888"
                  width="4.59659"
                  height="25.1483"
                  rx="2.2983"
                  transform="rotate(-127.945 4.82649 29.0888)"
                  fill="#A5A5A5"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      {isPopupOpen && (
        <Modal isOpen={isPopupOpen} onClose={togglePopup}>
          <div className="headar-box">
            <h2 className="text-lg font-medium px-6 py-4 bg-indigo-600 text-white">Choose listing</h2>
          </div>
          <div className="p-6">
            <div>
              {record && record.map((item, index) => (
                <div className="flex mb-3 pb-3 border-b" key={index} style={{ cursor: "pointer" }}>
                  {/* {item?.property_image[0]?.image_url ? ( */}
                  <div className="w-[60px] h-[40px] object-cover mr-2">
                    <Image
                      width={100}
                      height={100}
                      layout="responsive"
                      src={item?.property_image[0]?.image_url || "https://th.bing.com/th/id/OIP.F4eiZn0Wjgp4EFtocph2BAAAAA?rs=1&pid=ImgDetMain"}
                      alt="Property cover image"
                      className="!h-full object-cover"
                      onClick={() => {
                        toggleimagePopup(item?.uuid);
                      }}
                    />
                  </div>
                  {/*  ) : ( */}
                  {/* <div className="w-[30px] h-[20px] object-cover mr-2" style={{ cursor: "pointer" }} >
                      <FaHouse size={30} />
                    </div> */}
                  {/* )} */}
                  <h2 className="text-lg font-medium mb-2 ">{item?.name || "please name"}</h2>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
      {isimage && (
        <Modal isOpen={isimage} onClose={toggleimagePopup}>
          <div className="headar-box">
            <h2 className="text-lg font-medium px-6 py-4 bg-indigo-600 text-white">Choose Image </h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col items-start space-y-1  mb-3 pb-3 border-b " style={{ cursor: "pointer" }} >
              <div className="border flex w-full p-4 items-center rounded-md hover:border-[#4f46e5] mb-3 " style={{ cursor: "pointer" }}
                onClick={() => {
                  setUseExistingImages(true);
                  duplicateProperty();
                }}
              >
                {" "}
                <svg className="mr-3 w-[50px]" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" ><path d="M27 3a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM8.89 19.04l-.1.08L3 24.92V25a2 2 0 0 0 1.85 2H18.1l-7.88-7.88a1 1 0 0 0-1.32-.08zm12.5-6-.1.08-7.13 7.13L20.92 27H27a2 2 0 0 0 2-1.85v-5.73l-6.3-6.3a1 1 0 0 0-1.31-.08zM27 5H5a2 2 0 0 0-2 2v15.08l4.38-4.37a3 3 0 0 1 4.1-.14l.14.14 1.13 1.13 7.13-7.13a3 3 0 0 1 4.1-.14l.14.14L29 16.59V7a2 2 0 0 0-1.85-2zM8 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg>
                <h3 className="text-lg text-black">With Image</h3>
              </div>
              <div className="border flex w-full p-4 items-center rounded-md hover:border-[#4f46e5]" style={{ cursor: "pointer" }}
                onClick={() => {
                  setUseExistingImages(false);
                  duplicateProperty();
                }}
              >
                {" "}
                <svg className="mr-3 w-[50px]" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false"><path d="M25 5a4 4 0 0 1 4 4v17a5 5 0 0 1-5 5H12a5 5 0 0 1-5-5V10a5 5 0 0 1 5-5h13zm0 2H12a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a2 2 0 0 0-2-2zm-3-6v2H11a6 6 0 0 0-6 5.78V22H3V9a8 8 0 0 1 7.75-8H22z"></path></svg>
                <h3>Without Image</h3>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {openAddPage ? (
        <Property
          //   fetchProperties={() => fetchProperty(uuid)}
          p={data?.data}
          useExistingImages={useExistingImages}
        />
      ) : (
        <></>
      )}
    </AdminLayout>
  );
}
export default Index;
