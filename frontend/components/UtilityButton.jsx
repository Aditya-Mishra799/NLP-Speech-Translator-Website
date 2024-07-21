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
  return (
    <Tooltip label = {tooltip}>
      <Box position={"relative"}>
        <IconButton
          icon={icon}
          isRound={isRound}
          size="40"
          variant={variant}
          onClick={onClick}
          fontSize={fontSize}
          colorScheme={color}
          p="2"
        />
        {isLoading ? (
          <CircularProgress
            thickness={"4px"}
            size="42"
            isIndeterminate
            color={loadColor}
            position="absolute"
            top={"-1"}
            left={"-1"}
          /> 
        ): <></>}
      </Box>
    </Tooltip>
  );
};

export default UtilityButton;
