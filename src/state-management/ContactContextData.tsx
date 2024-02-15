import { createContext } from "react"

//Mentioning the type of data we should receive from API
export interface IContactData{
    id: number,
    job: string,
    icon: string,
    name: string,
    email: string,
    phone: string,
    company_name: string,
    profile_image: string,
}

export interface ISearchData{
    id: number,
    job: string,
    icon: string,
    name: string,
    email: string,
    phone: string,
    company_name: string,
    profile_image: string,
    isHover: boolean,
}

interface IContactDataType{
    contactData : IContactData[],
    searchResult : ISearchData[],
    searchDispatch : React.Dispatch<{
        type: string;
        payload: unknown;
    }>,
}

//declaring all the state which can be accessible by child components when declared in parent
export const ContactContextData = createContext<IContactDataType>({
    contactData: [],
    searchResult: [],
    searchDispatch : ()=>{},
})