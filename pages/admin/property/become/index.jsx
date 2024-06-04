import AdminLayout from "../../AdminLayout";
import { FaHouse } from "react-icons/fa6";
import Listing from "../../api/Listing";
import { useState, useEffect } from "react";
import { BsHouseAdd } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Modal from "../../hook/Modal";
import Image from "next/image";

function Index() {
    const Admin = "Admin name"
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isimage, setisimage] = useState(false);

    const [record, setRecord] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const main = new Listing();
        main.Adminproperty()
            .then((res) => {
                const data = res?.data?.data;
                let filteredListings = [];
                if (Array.isArray(data)) {
                    data.forEach(item => {
                        if (item?.step_completed !== 9) {
                            filteredListings.push(item);
                        }
                    });
                }
                if (filteredListings.length > 0) {
                    setRecord(filteredListings);
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

    const handleEditEntireProperty = (uuid) => {
        router.push(`/admin/property/edit/${uuid}`);
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const toggleimagePopup = () => {
        setisimage(!isimage);
    };

    return (
        <AdminLayout heading="Properties List">

            <>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="">
                            <h2>Welcome back, {Admin}</h2>
                            <p>Finish your listing</p>
                            <div>
                                {record && record.map((item, index) => (
                                    <div key={index} style={{ cursor: "pointer" }} onClick={() => handleEditEntireProperty(item?.uuid)}>
                                        <FaHouse />
                                        <h2 className="text-lg font-medium mb-2 heading-property">{item.name || "please name "}</h2>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="">
                            <h2>
                                Start a new listing
                            </h2>
                            <div className="" style={{ cursor: "pointer" }} onClick={() => {
                                router.push("/admin/property/add");
                            }}>
                                <BsHouseAdd />
                                <h2 className="text-lg font-medium mb-2 heading-property" >
                                    create  a new listing
                                </h2>
                            </div>
                            <div className="" onClick={() => { togglePopup() }}>
                                <IoCopyOutline />
                                <h2 className="text-lg font-medium mb-2 heading-property" >
                                    Dublicate an existing property
                                </h2>
                            </div>
                        </div>
                    </>
                )}
            </>
            {isPopupOpen && (
                <Modal isOpen={isPopupOpen} onClose={togglePopup}>
                    <div className="p-6">
                        <h2 className="text-lg font-medium mb-4">Choose listing</h2>
                        <div>
                            {record && record.map((item, index) => (

                                <div key={index} style={{ cursor: "pointer" }} >
                                    {item?.property_image[0]?.image_url ? (
                                        <Image
                                            width={100}
                                            height={300}
                                            layout="responsive"
                                            src={item?.property_image[0]?.image_url}
                                            alt="Property cover image"
                                            onClick={() => {
                                                toggleimagePopup()
                                            }}
                                        />
                                    ) : (
                                        <FaHouse />
                                    )}
                                    <h2 className="text-lg font-medium mb-2 heading-property">{item.name || "please name"}</h2>
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
                        <div>
                            <h2> With Image</h2>
                            <h2> Without Image</h2>
                        </div>
                    </div>
                </Modal>
            )}
        </AdminLayout>
    );
}

export default Index;
