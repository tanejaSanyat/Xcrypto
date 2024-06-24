import React from 'react'
import { Box,Stack,VStack,Avatar,Text } from '@chakra-ui/react'
const Footer = () => {
  return (
    <Box bgColor = {"white"} minH={"48"} px={"16"} py={["16","8"]} >
        <Stack direction={["column","row"]} h={"full"} alignItems={"center"}>
            <VStack w={"full"} alignItems = {["center","flex-start"]}>
                <Text fontWeight={"bold"}>About Us</Text>
                <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center","left"]}>We are the best crypto training app in India,Proving Guidance at reasonable prices</Text>
            </VStack>
            <VStack>
                <Avatar boxSize={"28"} mt={["4,0"]}/>
                <Text>Our Founder</Text>
            </VStack>
        </Stack>
    </Box>
  )
}

export default Footer
