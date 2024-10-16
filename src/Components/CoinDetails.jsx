import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { Container, Box, RadioGroup,Progress ,HStack,Button, Radio, VStack,Text,Image, StatNumber,Stat,StatLabel, StatHelpText, StatArrow,Badge } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../main';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const btns= ["24h","7d","14d","30d","60d","200d","1y","max"] ; 
  const params = useParams();
  const symbol = currency === "inr"? "₹" : currency === 'eur'? "€":"$" ; 
  const switchChartsStats = (key)=>{
    switch(key){
        case "24h":
            setDays("24h");
            setLoading(true);
            break ;

            case "7d":
            setDays("7");
            setLoading(true);
            break ;
            case "14d":
            setDays("14");

            setLoading(true);
            break ;

            case "30d":
            setDays("30");
            setLoading(true);

            break ;

            case "60d":
            setDays("60");

            setLoading(true);
            break ;

            case "200d":
            setDays("200");

            setLoading(true);
            break ;
            case "1y":
            setDays("365");

            setLoading(true);
            break ;
            case "max":
            setDays("max");

            setLoading(true);
            break ;
        default: 
        setDays("24h");
            setLoading(true);
        break;
    }

  }
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data:chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`); 
        setCoin(data);
        setLoading(false);
        setChartArray(chartData.prices) ;
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [params.id, currency,days]);

  if (error) return <ErrorComponent message={'Error while fetching'} />;

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={'full'} borderWidth={1}>
            <Chart currency={symbol} arr={chartArray} days={days}/>
            Coin details will be displayed here
          </Box>

        <HStack>
        <HStack>
  {btns.map((i) => (
    <Button key={i} onClick={() => switchChartsStats(i)}>{i}</Button>
  ))}
</HStack>
           </HStack>



          <RadioGroup  onChange={setCurrency} p={"8"}>
                    <HStack>
                        <Radio value={"inr"}>INR</Radio>
                        <Radio value={"eur"}>EUR</Radio>
                        <Radio value={"usd"}>USD</Radio>
                    </HStack>
                </RadioGroup>

                <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
                    <Text>
                    Last Updated on {Date(coin.market_data.last_updated).split("G")[0]} 
                    </Text>
                    <Image src = {coin.image.large} w={"16"} h = {"16"} objectFit = {"contain"}/>
                    <Stat>
                        <StatLabel>{coin.name}</StatLabel>
                        <StatNumber>{symbol}{coin.market_data.current_price[currency]}</StatNumber>
                    <StatHelpText>
                    <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}/>
                    {coin.market_data.price_change_percentage_24h}%
                    </StatHelpText>
                    </Stat>


                <Badge fontSize = {"2xl"} bgColor = {"black"} color={"white"} >
                {`#${coin.market_cap_rank}`}
                </Badge>

                <CustomBar high={`${symbol}${coin.market_data.high_24h[currency]}`} low={`${symbol}${coin.market_data.low_24h[currency]}`}/>
                <Box w = {"full"} p={"4"}>
                <Item title={"Max Supply"} value = {coin.market_data.max_supply}/> 
                <Item title={"Circulating Supply"} value = {coin.market_data.circulating_supply}/> 
                <Item title={"Market Cap"} value = {`${symbol}${coin.market_data.market_cap[currency]}`}/> 
                <Item title={"All Time High"} value = {`${symbol}${coin.market_data.ath[currency]}`}/> 
                <Item title={"All Time Low"} value = {`${symbol}${coin.market_data.atl[currency]}`}/> 
                </Box>
                </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({title,value})=>{
    return(
<HStack justifyContent={"space-between"} w = {"full"} my = {"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text> 
    <Text>{value}</Text>
</HStack>
    )
}

const CustomBar = ({ high, low }) => {
    return (
      <VStack w={"full"}>
        <Progress value={50} colorScheme={"teal"} w="full" />
        <HStack justifyContent={"space-between"} w={"full"}>
          <Badge colorScheme={"red"}>{low}</Badge>
          <Text fontSize={"sm"}>24H Range</Text>
          <Badge colorScheme="green">{high}</Badge>
        </HStack>
      </VStack>
    );
  };

export default CoinDetails;
