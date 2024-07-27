import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useContext, useState } from "react";
import RecorderMicButton from "./RecorderMicButton";
import { TranslationContext } from "./TranslationContext";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";


const SpeechRecorder = () => {
  const { state, dispatch } = useContext(TranslationContext);
  // Local state to maintain the cumulative transcript
  const [prevSourceText, setPrevSourceText] = useState(state.sourceText);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ language: state.sourceLanguage });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (listening && transcript) {
      dispatch({
        type: "SET_SOURCE_TEXT",
        payload: prevSourceText + transcript,
      });
    }
  }, [transcript]);

  useEffect(() => {
    if (!listening) {
      setPrevSourceText(state.sourceText + " ");
    }
  }, [listening, state.sourceText]);

  useEffect(() => {
    if (!listening) {
      dispatch({ type: "SET_IS_RECORDING", payload: false });
    } else {
      dispatch({ type: "SET_IS_RECORDING", payload: true });
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <Text textAlign={"center"} color="red">
        Your Browser does not support Speech Recognition !!!
      </Text>
    );
  }
  return (
    <Box>
      <RecorderMicButton
        isMicOn={listening}
        onClick={listening ? stopListening : startListening}
      />
    </Box>
  );
};

export default SpeechRecorder;
