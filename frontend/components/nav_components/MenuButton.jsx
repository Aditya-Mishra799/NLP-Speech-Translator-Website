import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
const MenuButton = ({ isOpen, onOpen, onClose }) => {
  return (
    <IconButton
      size={"lg"}
      icon={isOpen ? <IoMdClose /> : <CiMenuFries />}
      aria-label={"Open Menu"}
      display={{base: 'flex', md: "none" }}
      onClick={isOpen ? onClose : onOpen}
      alignItems = 'center'
      justifyItems={'center'}
    />
  );
};

export default MenuButton;
