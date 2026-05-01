 "use client"
import { getAllImage } from "@/Components/Auth/adminService";
import { getAllNewsUser, getRecentThreeNews, getTotalNewsCount } from "@/Components/Auth/userService";
import { createContext, useContext, useEffect, useState } from "react";

const donationListContext = createContext();
//Also for Image loading 
export default function DonationListContextProvider({ children }) {
    const [userDonationList, setuserDonationList] = useState([])
    const [allImages, setAllImages] = useState([]); //this is for Explore section
    const [isnewsDeleted,setNewsDeleted]=useState(false)
    const fetchAllImages = async () => {
        try {
            const response = await getAllImage();
            setAllImages(response);
        } catch (error) {
            console.log(error.errorMessage)
        }
    }

    //For News Card
     const [recentThreeNews, setRecentThreeNews] = useState([]);
     const [totalNews, setTotalNews] = useState(null);
        const fetchRecentThreeNews = async () => {
            try {
                const response = await getRecentThreeNews();
                setRecentThreeNews(response);
            } catch (error) {
                console.log(error);
            }
    
        }
        const fetchTotalNewsCount = async () => {
            try {
                const response = await getTotalNewsCount();
                setTotalNews(response);
            } catch (error) {
                console.log(error);
            }
    
        }


    useEffect (()=>{
        fetchRecentThreeNews()
    },[])

    return (
        <donationListContext.Provider value={{ userDonationList, setuserDonationList, fetchAllImages, allImages ,recentThreeNews, fetchRecentThreeNews, fetchTotalNewsCount, totalNews, isnewsDeleted,setNewsDeleted }}>
            {children}
        </donationListContext.Provider>
    );
}

export const useListContext = () => useContext(donationListContext);