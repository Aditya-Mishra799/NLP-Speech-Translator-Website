import { Stack } from '@chakra-ui/react'
import React from 'react'
import NavLink from './NavLink'
const Links = [
    {
        name: "Home",
        link : '/',
    },
    {
        name: "About developer",
        link : '#',
    },
    {
        name: "How it works",
        link : '#',
    },
    {
        name: "Support Us",
        link : '#',
    },
]
const MenuLinks = () => {
  return (
    <Stack
     direction={{base: 'column', md : 'row'}}
     spacing = {4}
     as = {'nav'}
    >
      {
        Links.map((item) =>{
            return <NavLink 
            link = {item.link}
            key = {item.name}
            >{item.name}</NavLink>
        })
      }
    </Stack>
  )
}

export default MenuLinks
