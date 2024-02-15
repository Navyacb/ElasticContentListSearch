import { AppShell } from "@mantine/core"
import Header from "./components/Header"
import { useReducer } from "react"
import axios from 'axios'
import { useQuery} from 'react-query'
import { ContactContextData, ISearchData ,IContactData } from "./state-management/ContactContextData"
import ContactList from "./components/ContactList"

const App = ()=>{

  const fetchContactData=async()=>{
    try{
      //using axios and async-await to fetch the contact data from api
      const response = await axios.get('https://retoolapi.dev/xJfD1o/data')
      return response.data
    }
    catch(error){
        console.log('error while fetching data from api',error)
    }
  }

  const searchReducer = (state:ISearchData[],action:{ type: string, payload: any})=>{
    switch(action.type){
      case'ADD_SEARCH_LIST':
        return action.payload
      case 'UPDATE_SEARCH_LIST':
        return action.payload
      case 'EMPTY_SEARCH_LIST':
       return [];
      case 'default' :
        return state
    }
  }


  //Using react-query to update the state with contact data fetched from api
  const {data:contactData} = useQuery({
    queryFn : ()=>fetchContactData(),
    queryKey : ["ContactData"],
    onSuccess : (data) => {
      searchDispatch({
        type:'ADD_SEARCH_LIST',
        payload: data.map((ele: IContactData) => ({ ...ele, isHover: false }))
      })
    },
  })

  const [searchResult,searchDispatch] = useReducer(searchReducer,[])

  return (
    <ContactContextData.Provider value={{contactData,searchResult,searchDispatch}}>
      <AppShell>
        <AppShell.Header>
            <Header/>
        </AppShell.Header>
        <ContactList/>
      </AppShell>
    </ContactContextData.Provider>
  )
}

export default App