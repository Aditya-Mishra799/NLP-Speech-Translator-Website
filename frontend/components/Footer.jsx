import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box
     bg = 'teal.800'
     p = {6}
     w = 'full'
     mt = '4'
     textAlign={'center'}
    >
       <Text
       fontSize={'x-large'}
       fontWeight ='medium'
       color={'white'}
       >Made By Aditya Mishra.</Text>
    </Box>
  )
}

export default Footer
