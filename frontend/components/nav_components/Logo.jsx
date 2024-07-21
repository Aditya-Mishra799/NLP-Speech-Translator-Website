import { Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Logo = () => {
//  const color = useColorModeValue('teal.400', 'teal.200')
  return (
    <Text
    fontSize={{base: 'larger', md : 'x-large'}}
    fontWeight = {'bold'}
    color = {'teal.500'}
    w = 'max-content'
    alignSelf={'center'}
    >
      Translator.AI
    </Text>
  )
}

export default Logo
