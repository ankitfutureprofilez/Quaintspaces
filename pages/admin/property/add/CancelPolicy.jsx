function CancelPolicy({ showFirm, setShowFirm, showFlexible, setShowFlexible, selectedPolicy, setSelectedPolicy, longTermPolicy, setLongTermPolicy }) {
    const handlePolicyChanges = (policy) => {
        setLongTermPolicy(longTermPolicy === policy ? "" : policy);
    };

    const handlePolicyChange = (policy) => {
        setSelectedPolicy(selectedPolicy === policy ? "" : policy);
    };

    const policies = [
        {
            policy: 'Flexible',
            description: 'Guests get a full refund if they cancel up to a day before check-in.'
        },
        {
            policy: 'Moderate',
            description: 'Guests get a full refund if they cancel up to 5 days before check-in.'
        },
        {
            policy: 'Firm',
            description: 'Guests get a full refund if they cancel up to 30 days before check-in, except in certain cases.'
        },
        {
            policy: 'Strict',
            description: 'Guests get a full refund if they cancel within 48 hours of booking and at least 14 days before check-in.'
        }
    ];

    const toggleFlexible = () => {
        setShowFlexible(true);
        setShowFirm(false);
    };

    const toggleFirm = () => {
        setShowFirm(true);
        setShowFlexible(false);
    };

    return (
        <div className="  flex">
            <div className="w-1/2 pr-2 ">
                <h2 className="text-center font-bold text-2xl text-slate-900 mt-3 mb-4">Cancellation policy</h2>
                <div className="p-4 mb-4 pb-6 mt-3 border-b">
                    <p className="text-center font-normal text-lg text-slate-700 mt-3 mb-4">Standard policy</p>
                    <p className="text-center font-normal text-sm text-slate-500 mt-3 mb-4">Applies to any stays under 28 nights.</p>
                    <div
                        onClick={toggleFlexible}
                        className={`flex flex-col border-2 p-3 cursor-pointer ${showFlexible === true ? "border-indigo-600" : "border-gray-200"}`}
                    >

                        <label className="flex items-center cursor-pointer mx-auto text-center">Flexible</label>
                        <p className="text-gray-500">
                            First 30 days are non-refundable. Full refund up to 30 days before check-in.
                        </p>
                    </div>
                </div>
                <div className="p-4 mb-5 mt-3 ">
                    <p className="text-center font-normal text-lg text-slate-700 mt-3 mb-4">Long-term stay policy</p>
                    <p className="text-center font-normal text-sm text-slate-500 mt-3 mb-4">Applies to stays 28 nights or longer.</p>

                    <div
                        onClick={toggleFirm}
                        className={`flex flex-col border-2 p-3 cursor-pointer ${showFirm === true ? "border-indigo-600" : "border-gray-200"}`}
                    >
                        <label className="flex items-center cursor-pointer mx-auto text-center">Firm</label>
                        <p className="text-gray-500">
                            Full refund up to 30 days before check-in. After that, the first 30 days of the stay are non-refundable.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 pl-2">
                {showFlexible === true && (
                    <div className="rounded-lg border text-center overflow-hidden border-indigo-600">
                        <h2 className="text-xl bg-indigo-600 text-white font-semibold p-4">Choose your standard policy</h2>
                        <div className="p-4">

                            <p className="text-gray-500 mb-4">
                                To understand the full policies, go to the{" "}
                                <span className="underline font-semibold cursor-pointer">Help Centre.</span>
                            </p>
                            <div className="flex flex-wrap ">
                                {policies.map(({ policy, description }) => (
                                    <div key={policy}
                                        onChange={() => handlePolicyChange(policy)}
                                        className={`flex mb-4 p-4 border-2 relative w-full md:w-full cursor-pointer ${selectedPolicy === policy ? "border-indigo-600" : "border-gray-200"}`}  >
                                        <div className=" "
                                        >
                                            <label className=" text-lg mb-3">
                                                {policy}
                                                <input
                                                    type="checkbox"
                                                    name={policy}
                                                    value={policy}
                                                    checked={selectedPolicy === policy}
                                                    onChange={() => handlePolicyChange(policy)}
                                                    className="ml-2 w-4 h-4 cursor-pointer absolute top-2 right-2"
                                                />
                                            </label>
                                            <p className="text-gray-500  text-center">
                                                {description}
                                            </p>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {showFirm && (
                    <div className=" rounded-lg border text-center overflow-hidden border-indigo-600">
                        <h2 className="text-xl font-semibold bg-indigo-600 text-white  p-4">Choose your long-term stay policy</h2>
                        <div className="p-4">

                            <p className="text-gray-500 mb-4">
                                To understand the full policies, visit the{" "}
                                <span className="underline font-semibold cursor-pointer">Help Centre.</span>
                            </p>
                            <div className="">
                                <div
                                    className={`flex justify-center mb-4 p-4 relative items-center border-2 cursor-pointer ${longTermPolicy === "Flexible" ? "border-indigo-600" : "border-gray-200"
                                        }`}
                                >
                                    <div className="flex flex-col"  
                                        onChange={() => handlePolicyChanges("Flexible")}
                                    >
                                        <label className="flex items-center cursor-pointer mx-auto text-center text-lg mb-2">Flexible</label>
                                        <p className="text-gray-500">
                                            First 30 days are non-refundable. Full refund up to 30 days before check-in.
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        name="longTermPolicy"
                                        value="Flexible"
                                        checked={longTermPolicy === "Flexible"}
                                        onChange={() => handlePolicyChanges("Flexible")}
                                        className="ml-2 w-4 h-4 cursor-pointer absolute top-2 right-2"
                                    />
                                </div>
                                <div
                                    className={`flex justify-center p-4 mb-4 relative items-center border-2 cursor-pointer ${longTermPolicy === "Strict" ? "border-indigo-600" : "border-gray-200"
                                        }`}
                                >
                                    <div className="flex flex-col"    onChange={() => handlePolicyChanges("Strict")}>
                                        <label className="flex items-center cursor-pointer mx-auto text-center text-lg mb-2">Strict</label>
                                        <p className="text-gray-500 ml-4">
                                            Full refund if canceled within 48 hours of booking and at least 28 days before check-in. After that, the first 30 days of the stay are non-refundable.
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        name="longTermPolicy"
                                        value="Strict"
                                        checked={longTermPolicy === "Strict"}
                                        onChange={() => handlePolicyChanges("Strict")}
                                        className="mr-2 w-4 h-4 cursor-pointer absolute top-2 right-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CancelPolicy;
