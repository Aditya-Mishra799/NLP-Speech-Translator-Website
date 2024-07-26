import { Box } from "@chakra-ui/react";
import React, { useEffect, useContext, useState } from "react";
import RecorderMicButton from "./RecorderMicButton";
import { TranslationContext } from "./TranslationContext";

const SpeechRecorder = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const { state, dispatch } = useContext(TranslationContext);
  const toggleRecording = () => {
    dispatch({
      type: "SET_IS_RECORDING",
      payload: !isMicOn,
    });
    setIsMicOn(!isMicOn);
  };

  useEffect(() => {
    let recognition = null;

    const startRecognition = () => {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = state.sourceLanguage;
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            dispatch({
              type: "APPEND_SOURCE_TEXT",
              payload: event.results[i][0].transcript,
            });
          }
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.start();
    };

    const stopRecognition = () => {
      if (recognition) {
        recognition.stop();
      }
    };

    if (isMicOn) {
      dispatch({
        type: "APPEND_SOURCE_TEXT",
        payload: ' ',
      });
      startRecognition();
    } else {
      stopRecognition();
    }

    return () => {
      stopRecognition();
    };
  }, [isMicOn]);

  return (
    <Box>
      <RecorderMicButton
        isMicOn={isMicOn}
        onClick={() => toggleRecording()}
      />
    </Box>
  );
};

export default SpeechRecorder;
