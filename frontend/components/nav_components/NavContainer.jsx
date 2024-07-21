'use client'
import { Box, Stack, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";
import MenuButton from "./MenuButton";
import MenuLinks from "./MenuLinks";


const NavContainer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      w="full"
      spacing={2}
      py={6}
      px ={4}
      bg={"gray.50"}
      align="center"
    >
      <Stack align={"center"}
      direction = 'row'
      justify={'space-between'}
      w = {{base :'full', md :'max-content'}}
      >
        <Logo />
         <MenuButton
         isOpen = {isOpen}
         onClose = {onClose}
         onOpen = {onOpen}
         />
      </Stack>
      <Box
       display = {{base : isOpen ? 'block': 'none', md : 'block'}}
      >
        <MenuLinks />
      </Box>
    </Stack>
  );
};

export default NavContainer;
