import { useContext } from "react"
import { ContactContextData, ISearchData } from "../state-management/ContactContextData"
import { Avatar, Card, Image, SimpleGrid, Stack, Text } from "@mantine/core"
import styles from './ContactList.module.css'

const ContactList = ()=>{

    const {searchResult,searchDispatch} = useContext(ContactContextData)

    const updateSearchResult = (data:ISearchData)=>{
        searchDispatch({
            type:'UPDATE_SEARCH_LIST',
            payload:searchResult.map((ele:ISearchData)=>{
                if(ele.id === data.id){
                    return {...ele,isHover:!ele.isHover}
                }else{
                    return {...ele,isHover:false}
                }
            })})
    }
    
    return(
            <SimpleGrid cols={{ base: 1, xs: 4 ,xl:6}} 
                        mx={{ base: 30, sm: 70 }} 
                        my={100}
            >
                {
                    searchResult.length>0 ?
                    searchResult.map(data=>{
                        return(
                            <Card p="md"  shadow="md" withBorder 
                                onMouseEnter={() => updateSearchResult(data)}
                                onMouseLeave={() => updateSearchResult(data)}
                                key={data.id}
                                className={styles.card}
                            >
                                <Card.Section>
                                    <Image src={data.profile_image} height={data.isHover?100 :150} fit="cover" style={{minHeight:data.isHover? '100px' : '150px'}} />
                                    <Avatar
                                    src={data.icon}
                                    size={34}
                                    radius="xl"
                                    mr="xs"
                                    mt='-16px'
                                    />
                                </Card.Section>
    
                                <Text fw={500}>{data.name}</Text>
                                <Text size="sm" c="dimmed">Job Title | {data.job}</Text>
                                {
                                    data.isHover && (
                                        <Stack  gap="xs" mt={15}>
                                            <Text size="sm" c="dimmed">Phone Number:{data.phone}</Text>
                                            <Text size="sm" c="dimmed">{data.email}</Text>
                                        </Stack>
                                    )
                                }
                            </Card>
                        )
                    }) :
                    <Text c='red'>There is no Contact present based on the search text entered !!!</Text>
                }
            </SimpleGrid>
    )
}

export default ContactList