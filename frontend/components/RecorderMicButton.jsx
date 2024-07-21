import { IconButton, Tooltip } from '@chakra-ui/react';
import React from 'react'
import { CiMicrophoneOn } from "react-icons/ci";
import { CiMicrophoneOff } from "react-icons/ci";

const RecorderMicButton = ({isMicOn, onClick}) => {
  return (
    <Tooltip
    label = {`Click to ${isMicOn ? 'stop recording' : 'record'}.`}
    >
    <IconButton
    variant={'solid'}
    colorScheme = 'teal'
    size={'lg'}
    w = '70px'
    h = '70px'
    icon={isMicOn ? <CiMicrophoneOff/> : <CiMicrophoneOn/>}
    onClick = {onClick}
    isRound = {true}
    fontSize = '40px'
    />
    </Tooltip>
      
  )
}

export default RecorderMicButton
