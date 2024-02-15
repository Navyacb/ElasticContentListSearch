import { Box, Group, Text, TextInput , rem} from "@mantine/core"
import { IconSearch } from '@tabler/icons-react';
import { useState,ChangeEvent, useContext } from "react";
import { ContactContextData } from "../state-management/ContactContextData";

const Header = ()=>{

    const {searchDispatch, contactData} = useContext(ContactContextData)
    const [searchText,setSearchText] = useState('')

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const text = e.target.value.toLowerCase()
        setSearchText(e.target.value)
        const result = contactData.filter(data=>{
            return (data.name.toLowerCase().includes(text) || data.job.toLowerCase().includes(text))
        })
        searchDispatch({type:'UPDATE_SEARCH_LIST',payload:result})
    }

    return(
        <Box 
            mx={{ base: 20, sm: 70 }} 
            my= {15}
        >
             <Group justify="space-between" gap="xs" >
                <Text fw={500} c="#696969" size="xl">Contact List</Text>
                <TextInput
                    radius="xs"
                    size="md"
                    style={{ width: "40%" }}
                    placeholder="search..."
                    value={searchText}
                    onChange={handleChange}
                    rightSectionWidth={42}
                    rightSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}             
                />
             </Group>
        </Box>
    )
}

export default Header