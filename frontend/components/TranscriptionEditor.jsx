import {
  Box,
  Card,
  CardBody,
  CardHeader,
  VStack,
  HStack,
  Heading,
  Text,
  Tooltip,
  Textarea,
  CircularProgress,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { FaDeleteLeft } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { HiSpeakerXMark } from "react-icons/hi2";
import { MdOutlineReplay } from "react-icons/md";
import UtilityButton from "./UtilityButton";


const TranscriptionEditor = ({
  isEditable = false,
  value,
  setValue,
  audioRef,
  playAudio,
  pauseAudio,
  resetAudio,
  setEditing,
  isEditing = false,
  isLoding = false,
  title = "Editor",
  placeholder = "Please say something .....",
}) => {
  const [isPlaying, setIsplaying] = useState(false);
  const togglePlaying = () => setIsplaying(!isPlaying);
  const textareaRef = useRef(null);
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      playAudio(audioRef);
    } else {
      pauseAudio(audioRef);
    }
  }, [isPlaying]);
  const handleEditText = () => {
    if (isEditable) {
      setEditing(true);
    }
  };
  const handleClickOutside = (event) => {
    if (textareaRef.current && !textareaRef.current.contains(event.target)) {
      setEditing(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(value.length, value.length);
    }
  }, [isEditing]);
  //  Detect when audio has ended and set isPlaying to false
  useEffect(() => {
    if (!audioRef.current) return;
    const handleEnded = () => {
      setIsplaying(false);
    };
    const audioElement = audioRef.current;
    audioElement.addEventListener("ended", handleEnded);
    //clean up event listener on unmount

    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [audioRef]);

  // translate the placeholder and 
  const lodingIndication = (
    <Box position={"absolute"} bottom="1" right={"1"}>
      <CircularProgress
        color="teal.200"
        thickness={"4px"}
        size="10"
        isIndeterminate
      />
    </Box>
  );
  return (
    <Box>
      <Card w={{ base: "xs", sm : 'sm',  md: "sm", lg: 'md' }} pb={2.5}
      _hover = {{
        boxShadow : 'lg',
      }}
      >
        <CardHeader>
          <HStack justify={"space-between"} w="full">
            <Heading size="md">{title}</Heading>
            <HStack justify={"space-between"}>
              <UtilityButton
                icon={isPlaying ? <HiSpeakerXMark /> : <HiSpeakerWave />}
                onClick={togglePlaying}
                isLoading={isLoding}
                variant="outline"
                color="teal"
                tooltip={`${!isPlaying ? "Play" : "Stop"} speech.`}
              />
              <UtilityButton
                icon={
                  <Box
                    transition={"0.3s transform  ease"}
                    _active={{
                      transform: "rotate(180deg)",
                    }}
                  >
                    <MdOutlineReplay />
                  </Box>
                }
                onClick={() => resetAudio(audioRef)}
                isLoading={isLoding}
                color="teal"
                variant="outline"
                tooltip={"Reset speech"}
              />
            </HStack>
          </HStack>
        </CardHeader>
        <CardBody>
          {!isEditing ? (
            <Tooltip label={isEditable ? "Double Click to edit" : null}>
              <Box
                height={"44"}
                onDoubleClick={handleEditText}
                overflowY="scroll"
                __css={{
                  "&::-webkit-scrollbar": {
                    w: "2",
                  },
                  "&::-webkit-scrollbar-track": {
                    w: "6",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    borderRadius: "10",
                    bg: `gray.100`,
                  },
                }}
              >
                <Text fontSize={"large"}>{value || placeholder}</Text>
              </Box>
            </Tooltip>
          ) : (
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              height="44"
              fontSize={"large"}
            />
          )}
        </CardBody>
        {isEditable ? (
          <HStack position={"absolute"} bottom="1" left="1">
            <UtilityButton
              icon={<FaDeleteLeft />}
              onClick={() => setValue("")}
              color="blue"
              tooltip={"Clear text"}
            />
            <UtilityButton
              icon={<FaEdit />}
              onClick={handleEditText}
              color="red"
              tooltip={"Edit text"}
            />
          </HStack>
        ) : (
          <></>
        )}
        {isLoding && !isEditable ? lodingIndication :<></>}
      </Card>
    </Box>
  );
};

export default TranscriptionEditor;
