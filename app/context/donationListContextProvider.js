"use client"
import { getAllImage } from "@/Components/Auth/adminService";
import { createContext, useContext, useState } from "react";

const donationListContext = createContext();
//Also for Image loading 
export default function DonationListContextProvider({ children }) {
    const [userDonationList, setuserDonationList] = useState([])
    const [allImages, setAllImages] = useState([]); //this is for Explore section
    const fetchAllImages = async () => {
        try {
            const response = await getAllImage();
            setAllImages(response);
        } catch (error) {
            console.log(error.errorMessage)
        }
    }

    

    return (
        <donationListContext.Provider value={{ userDonationList, setuserDonationList, fetchAllImages, allImages }}>
            {children}
        </donationListContext.Provider>
    );
}

export const useListContext = () => useContext(donationListContext);