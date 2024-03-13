import { useState } from "react";
import Button from "../elements/Button";

function Booking() {
    const [selectedButton, setSelectedButton] = useState("upcoming");

    const handleGroupChange = (e) => {
        setSelectedButton(e);
    };

    const BookingTable = () => {
        return (
            <div className="contaainer mx-auto">


                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-orange-300 ">Title</th>
                            <th className="px-4 py-2">Check In</th>
                            <th className="px-4 py-2">Check Out </th>
                            <th className="px-4 py-2">Status </th>
                            <th className="px-4 py-2">Price  </th>
                            <th className="px-4 py-2">Action  </th>



                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td>
                                <img src="image_source" alt="alt" />
                                <div class="title">title_text</div>
                                <div class="description">2bhk_description</div>
                            </td>
                            <td className="px-4 py-2">16-02-2024</td>
                            <td className="px-4 py-2">18-02-2024</td>
                            <td className="px-4 py-2">
                                <Button text={"Upcoming"} className={"font-inter text-blue-700 font-medium leading-tight text-center w-32 border-2 p-3 rounded-full "} />
                            </td>
                            <td className="px-4 py-2">530000</td>
                            <td className="px-4 py-2">                        <Button text={"Cancel"} className={"font-inter text-red-700 font-medium leading-tight text-center w-32 border-2  border-red-500 p-3 rounded-full "} />
                            </td>


                        </tr>
                    </tbody>
                </table>

            </div>
        );
    }



    return (
        <>
            <div className=" container mx-auto flex align-items-center my-4 mx-4 py-2 space-x-4">
                <Button
                    className={`font-inter text-gray-400 font-medium leading-tight text-center w-52 border-2 p-3 rounded-full ${selectedButton === "upcoming" ? "bg-orange-300 text-white" : "text-black"
                        }`}
                    onClick={() => handleGroupChange("upcoming")}
                    text={"Upcoming"}
                />

                <Button
                    text={"Completed"}
                    className={`font-inter text-gray-400 font-medium leading-tight text-center w-52 border-2 p-3 rounded-full ${selectedButton === "completed" ? "bg-orange-300 text-white" : "text-black"
                        } `}
                    onClick={() => handleGroupChange("completed")}
                />


                <Button
                    className={`font-inter text-gray-400 font-medium leading-tight text-center w-52 border-2 p-3 rounded-full ${selectedButton === "canceled" ? "bg-orange-300 text-white" : "text-black"
                        } `}
                    onClick={() => handleGroupChange("canceled")}
                    text={"Canceled"}
                />


            </div>

            {selectedButton === "upcoming" && <div className="container mx-auto">
                <BookingTable />
            </div>}
            {selectedButton === "completed" && <div className="container mx-auto">2ccompleted</div>}
            {selectedButton === "canceled" && <div className="container mx-auto">3</div>}
        </>
    );
}

export default Booking;
