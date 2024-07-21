import { Select } from "@chakra-ui/react";
import React from "react";

const Selection = ({
  options,
  value,
  setValue,
  placeholder = "Please Select",
  ...rest
}) => {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      size={{ base: "md", md: "lg" }}
      textTransform = 'capitalize'
      fontSize={{ base: "medium", md: "large", lg: 'larger' }}
      color="gray.800"
      borderRadius={"full"}
      w = {{base:'32', md :'sm'}}
    >
      {Object.entries(options ?? {}).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </Select>
  );
};

export default Selection;
