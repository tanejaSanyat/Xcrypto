import React from 'react'
import { Image } from '@chakra-ui/react'
import { Box,Text } from '@chakra-ui/react'
import {motion} from "framer-motion"
import iM from "../assets/btc.png" ;
const Home = () => {
  return (
    <Box w={"full"} h = {"85vh"} bgColor={"black"}>
      <motion.div style = {{height:"80vh"}} animate={{translateY:"20px"}} transition={{duration:2,repeat:Infinity,repeatType:"reverse"} }>
      <Image w = {"full"} h = {"full"} objectFit = {"contain"} src = {iM}/>
      </motion.div>
      <Text fontSize = {"6xl"} textAlign={"center"} fontWeight = {"thin"} color ={"white"} mt={"-20"}>Xcrypto</Text>
    </Box>
  )
}

export default Home
