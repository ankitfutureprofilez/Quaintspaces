import React, { useState } from 'react';

export default function Property() {
    const [formData, setFormData] = useState({
        guests: '',
        bedrooms: '',
        beds: '',
        bathrooms: '',
        location: "",
        propertyName: '',
        address: '',
        city: '',
        state: '',
        about: '',
        images: []
    });

    console.log("formdaa", formData)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleFileChange = (e) => {
        let filesToAdd = Array.from(e.target.files);
        let newImages = formData.images.concat(filesToAdd).slice(0, 5);
        setFormData(prevFormData => ({
            ...prevFormData,
            images: newImages,
        }));
    };

    const removeImage = (indexToRemove) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            images: prevFormData.images.filter((_, index) => index !== indexToRemove),
        }));
    };
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-8">
            <div className="max-w-4xl w-full space-y-8">
                <div className="bg-white shadow rounded-lg p-8 sm:p-12">
                    <h2 className="text-2xl font-semibold leading-tight text-gray-700">List Your Property</h2>
                    <form className="mt-8 space-y-6" action="#" method="POST">

                        <div className="mt-4">
                            <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700">Property Name</label>
                            <input type="text" name="propertyName" id="propertyName"
                                className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                value={formData.propertyName} onChange={handleInputChange} />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input type="text" name="address" id="address"
                                className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                value={formData.address} onChange={handleInputChange} />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Location</label>
                            <input type="text" name="address" id="address"
                                className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                value={formData.location} onChange={handleInputChange} />
                        </div>


                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} name="images" multiple />

                            </label>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {formData.images.map((file, index) => (
                                <div key={index} className="relative">
                                    {/* Overlay Remove Button */}
                                    <button type="button" onClick={() => removeImage(index)}
                                        className="absolute right-0 top-0 bg-red-500 text-white rounded-full p-1 m-1">
                                        &times;
                                    </button>
                                    <img src={URL.createObjectURL(file)} alt={`Preview ${index}`}
                                        className="max-w-xs max-h-44 w-full h-auto gap-5 mr-4" onLoad={() => URL.revokeObjectURL(file)} />
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div>
                                <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Guests</label>
                                <select id="guests" name="guests" autoComplete="guests"
                                    className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                    value={formData.guests} onChange={handleInputChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedrooms</label>
                                <select id="bedrooms" name="bedrooms"
                                    className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                    value={formData.bedrooms} onChange={handleInputChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="beds" className="block text-sm font-medium text-gray-700">Beds</label>
                                <select id="beds" name="beds" autoComplete="beds"
                                    className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                    value={formData.beds} onChange={handleInputChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms</label>
                                <select id="bathrooms" name="bathrooms" autoComplete="bathrooms"
                                    className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                    value={formData.bathrooms} onChange={handleInputChange}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                        </div>



                        {/* Add more input fields as needed */}

                        <div className="pt-6">
                            <button type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
