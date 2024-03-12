import { useState } from "react";
import Button from "../elements/Button";

function Booking() {
    const [selectedButton, setSelectedButton] = useState("upcoming");

    const handleGroupChange = (e) => {
        setSelectedButton(e);
    };

    return (
        <>
            <div className="flex align-items-center my-4 mx-4 py-4 space-x-4">
                <Button
                    className={`font-inter text-base font-medium leading-tight text-center w-52 border-2 p-4 rounded-full ${
                        selectedButton === "upcoming"
                    }`}
                    onClick={() => handleGroupChange("upcoming")}
                text={"Upcoming"}
               />
                 
                <Button
                text={"Completed"}
                    className={`font-inter text-base font-medium leading-tight text-center w-52 border-2 p-4 rounded-full  ${
                        selectedButton === "completed"
                    } `}
                    onClick={() => handleGroupChange("completed")}
               />
                    
                <Button
                    className={`font-inter text-base font-medium leading-tight text-center w-52 border-2 p-4 rounded-full ${
                        selectedButton === "canceled"
                           
                    } `}
                    onClick={() => handleGroupChange("canceled")}
                    text={"Canceled"}
                />
                    
              
            </div>

            {selectedButton === "upcoming" && <div>1yaah</div>}
            {selectedButton === "completed" && <div>2ccompleted</div>}
            {selectedButton === "canceled" && <div>3</div>}
        </>
    );
}

export default Booking;
