import { useEffect, useState } from 'react';
import { server } from '../main';
import axios from 'axios';
import Loader from './Loader';
import ErrorComponent from "./ErrorComponent.jsx";
import { Container,HStack,VStack,Image,Heading,Text } from '@chakra-ui/react';

const Exchanges = () => {
    const [loader,setLoader] = useState(true) ; 
    const [exchanges,setExchanges] = useState([]) ; 
    const [error,setError] = useState(false) ; 
    useEffect(() => {
        const fetchExchanges = async () => {
            try{
                const {data} = await axios.get(`${server}/exchanges`);
                setExchanges(data) ; 
                setLoader(false) ; 
            }
            catch{
                setError(true) ; 
                setLoader(false) ; 
            }
             
        };
        fetchExchanges();
    }, []);
    if(error) return <ErrorComponent message={"Error while fetching Coin"}/>;
    return (
        <Container maxW = {"container.xl"}>
            {loader? <Loader/> : <>
                
                <HStack wrap = {"wrap"} justifyContent={"space-evenly"}>
                    {exchanges.map((i)=>(
                        <ExchangeCard key={i.id} name = {i.name} img = {i.image} rank = {i.trust_score_rank} url = {i.url}/>
                    ))}
                </HStack>



                </>
            }
        </Container>
    );
};

const ExchangeCard = ({name, img,rank,url})=>{
    return <a href={url} target = "blank">
        <VStack w={"52"} shadow={"lg"} p = {"8"} borderRadius={"lg"} transition = {"all 0.3s"}
            m={"4"} css = {{
                "&:hover":{
                    transform:"scale(1.1)",
                }
            }}
        >
            <Image src={img} w={"10"} h = {'10'} objectFit={"contain"} alt = "Exchange"></Image>
            <Heading size={"md"} noOfLines={1}>{rank}</Heading>
            <Text noOfLines={1}>{name}</Text>
        </VStack>
    </a>
}

export default Exchanges;