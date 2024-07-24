import { Box } from "@chakra-ui/react";
import React, { useEffect, useContext, useState } from "react";
import RecorderMicButton from "./RecorderMicButton";
import { TranslationContext } from "./TranslationContext";

const SpeechRecorder = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const { state, dispatch } = useContext(TranslationContext);

  const toggleRecording = () => {
    if (!isMicOn) {
      // If stopping the recording, add a space to separate new text
      dispatch({
        type: "SET_SOURCE_TEXT",
        payload: (state.sourceText ?? '') + " ",
      });
    }
    console.log(state);
    dispatch({
      type: "SET_IS_RECORDING",
      payload: !isMicOn,
    });

    setIsMicOn(!isMicOn);
  };

  useEffect(() => {
    if (!isMicOn) return;

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = state.sourceLanguage;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      if (finalTranscript) {
        dispatch({
          type: "SET_SOURCE_TEXT",
          payload: (state.sourceText ?? '') + finalTranscript,
        });
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();

    return () => {
      recognition.stop();
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
