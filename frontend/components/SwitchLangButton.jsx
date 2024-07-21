import { IconButton, transition } from '@chakra-ui/react'
import React from 'react'
import { HiSwitchHorizontal } from "react-icons/hi";

const SwitchLangButton = ({onClick}) => {
  return (
    <IconButton
    isRound = {true}
    size = {'lg'}
    
    bg = 'gray.700'
    color = 'white'
    fontSize={{base:'x-large', md : 'xx-large'}}
    icon={<HiSwitchHorizontal/>}
    onClick = {onClick}
    _hover = {{
        bg : 'gray.800',
        transform: 'scale(1.1)',
        transition: 'transform 0.3s ease-in-out'
    }}
    />
  )
}

export default SwitchLangButton
