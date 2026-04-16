"use client"
import {  createContext, useContext, useState } from "react";

const donationListContext =createContext();

export default function DonationListContextProvider({children}){
    const [userDonationList,setuserDonationList] =useState([])

    return(
        <donationListContext.Provider value={{userDonationList,setuserDonationList}}>
            {children}
        </donationListContext.Provider>
    );
}

export const useDonationListContext=()=>useContext(donationListContext);