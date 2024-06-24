import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '../main';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';
import { HStack,Container,Button, RadioGroup,Radio } from '@chakra-ui/react';
import CoinCard from './CoinCard';
const Coins = () => {
    const [coins,setCoins] = useState([]) ; 
    const [loader,setLoader] = useState(true) ; 
    const [errorHai,setIsError] = useState(false) ; 
    const [page,setPage] = useState(1) ; 
    const [currency,setCurrency] = useState("inr") ; 
    const symbol = currency === "inr"? "₹" : currency === 'eur'? "€":"$" ; 
    const array = new Array(132).fill(1) ; 
    const changePage = (page)=>{
        setPage(page) ; 
        setLoader(true) ; 
    }
    useEffect(()=>{
        try{
            const myFunc = async()=>{
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`) ; 
                setCoins(data) ; 
                setLoader(false) ; 
            }
            myFunc() ; 
        }
        catch(error){
            setIsError(true) ; 
            setLoader(false) ; 
        }
    },[currency,page]);
    if(errorHai) return <ErrorComponent message={"Error while fetching coins"}/>
  return (
    <div>
     <Container maxW = {"container.xl"}>
            {loader? <Loader/> : <>
                <RadioGroup  onChange={setCurrency} p={"8"}>
                    <HStack>
                        <Radio value={"inr"}>INR</Radio>
                        <Radio value={"eur"}>EUR</Radio>
                        <Radio value={"usd"}>USD</Radio>
                    </HStack>
                </RadioGroup>
                <HStack wrap = {"wrap"} justifyContent={"space-evenly"}>
                    {coins.map((i)=>(
                        <CoinCard key={i.id} name = {i.name} img = {i.image} price={i.current_price} symbol={i.symbol} symbol = {symbol} id = {i.id}/>
                    ))}
                </HStack>


                <HStack w={"full"} overflowX={"auto"} p = {"8"}>
                    {
                        array.map((item,index)=>(
                            <Button key={index} bgColor={"blackAlpha.900"} color={"white"} onClick={()=>changePage(index+1)} >{index+1}</Button>
                        ))
                    }
                    <Button bgColor={"blackAlpha.900"} color={"white"} onClick={()=>changePage(2)}>2</Button>
                </HStack>
                </>
            }
        </Container>
    </div>
  )
}

export default Coins
