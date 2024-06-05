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
        console.log("record", data);
        let filteredListings = [];
        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item?.step_completed !== 9) {
              filteredListings?.push(item);
            }
          });
        }
        if (filteredListings?.length > 0) {
          setFilteredRecord(filteredListings);
          console.log(filteredListings);
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
          <p>Loading...</p>
        )
      ) : (
        <div className="w-[600px] py-8 mx-auto">
          <div className="">
            <h2 className="text-[32px] font-bold text-black mb-3">
              Welcome back, {Admin}
            </h2>
            <p className="text-[22px]  text-black mb-3">Finish your listing</p>
            <div>
              {filteredRecord &&
                filteredRecord.map((item, index) => (
                  <div
                    className="p-4 border rounded-xl mb-2 flex items-center"
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditEntireProperty(item?.uuid)}
                  >
                    {item?.property_image[0]?.image_url ? (
                      <div className="w-[60px] h-[40px] object-cover">
                        <Image
                          width={20}
                          height={20}
                          layout="responsive"
                          src={item?.property_image[0]?.image_url}
                          alt="Property cover image"
                          onClick={() => {
                            toggleimagePopup();
                          }}
                        />
                      </div>
                    ) : (
                      <FaHouse />
                    )}
                    <h2 className="text-lg font-medium ml-4 heading-property">
                      {item.name || "please name "}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-[22px]  text-black mb-3">
              Start a new listing
            </h2>
            <div
              className="p-4 border-b mb-2 flex items-center relative"
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push("/admin/property/add");
              }}
            >
              <BsHouseAdd />

              <h2 className="text-lg font-medium ml-4 heading-property ">
                Create a new listing
              </h2>
              <svg
                className="absolute top-5 right-2"
                width="18"
                height="25"
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
              <IoCopyOutline />
              <h2 className="text-lg font-medium ml-4 heading-property">
                Dublicate an existing property
              </h2>
              <svg
                className="absolute top-5 right-2"
                width="18"
                height="25"
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
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Choose listing</h2>
            <div>
              {record &&
                record.map((item, index) => (
                  <div
                    className="text-uppercase"
                    key={index}
                    style={{ cursor: "pointer" }}
                    // onClick={() => handleEditEntireProperty(item?.uuid)}
                  >
                    {item?.property_image[0]?.image_url ? (
                      <Image
                        width={100}
                        height={300}
                        layout="responsive"
                        src={item?.property_image[0]?.image_url}
                        alt="Property cover image"
                        onClick={() => {
                          toggleimagePopup(item?.uuid);
                        }}
                      />
                    ) : (
                      <FaHouse />
                    )}
                    <h2 className="text-lg font-medium mb-2 heading-property">
                      {item.name || "please name"}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
        </Modal>
      )}
      {isimage && (
        <Modal isOpen={isimage} onClose={toggleimagePopup}>
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Choose listing</h2>
            <div className="flex flex-col items-start space-y-1">
              <button
                onClick={() => {
                  setUseExistingImages(true);
                  duplicateProperty();
                }}
              >
                {" "}
                With Image
              </button>
              <button
                onClick={() => {
                  setUseExistingImages(false);
                  duplicateProperty();
                }}
              >
                {" "}
                Without Image
              </button>
            </div>
          </div>
        </Modal>
      )}
      {openAddPage ? (
        <Property
          //   fetchProperties={() => fetchProperty(uuid)}
          isEdit={true}
          stepdata={true}
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
