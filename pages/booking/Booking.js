import { useState } from "react";
import Button from "../elements/Button";

function Booking() {
    const [selectedButton, setSelectedButton] = useState("upcoming");

    const handleGroupChange = (e) => {
        setSelectedButton(e);
    };

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

            {selectedButton === "upcoming" && <div className="container mx-auto">1yaah</div>}
            {selectedButton === "completed" && <div className="container mx-auto">2ccompleted</div>}
            {selectedButton === "canceled" && <div className="container mx-auto">3</div>}
        </>
    );
}

export default Booking;
