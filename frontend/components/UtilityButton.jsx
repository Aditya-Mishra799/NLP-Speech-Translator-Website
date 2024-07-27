import { Box, CircularProgress, IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";

const UtilityButton = ({
  icon,
  isLoading = false,
  onClick = () => {},
  color,
  isRound = true,
  variant = "ghost",
  loadColor = "teal.400",
  fontSize = "18px",
  tooltip,
  ...rest
}) => {
  const loading = <CircularProgress
  thickness={"6px"}
  size="4"
  isIndeterminate
  color={loadColor}
/> 
  return (
    <Tooltip label = {tooltip}>
      <Box position={"relative"}>
        <IconButton
          icon={isLoading ? loading  :icon}
          isRound={isRound}
          size="40"
          variant={variant}
          onClick={onClick}
          fontSize={fontSize}
          colorScheme={color}
          p="2"
          {...rest}
        />
      </Box>
    </Tooltip>
  );
};

export default UtilityButton;
