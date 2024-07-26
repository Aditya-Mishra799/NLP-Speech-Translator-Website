import { HStack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import TranscriptionEditor from "./TranscriptionEditor";
import { TranslationContext } from "./TranslationContext";

const TranslationPanel = () => {
  const {
    state,
    dispatch,
    sourceAudioRef,
    destinationAudioRef,
    playAudio,
    pauseAudio,
    resetAudio,
    ...rest
  } = useContext(TranslationContext);

  const sourceTranscriptionEditor = (
    <TranscriptionEditor
      title="Source"
      isEditable={true}
      value={state.sourceText}
      playAudio={playAudio}
      pauseAudio={pauseAudio}
      resetAudio={resetAudio}
      audioRef={sourceAudioRef}
      setEditingListener ={(value) =>
        dispatch({ type: "SET_IS_EDITING", payload: value })
      }
      setValue={(value) =>
        dispatch({ type: "SET_SOURCE_TEXT", payload: value })
      }
      isLoding={state.isFetching}
    />
  );

  const destinationTranscriptionEditor = (
    <TranscriptionEditor
      title="Destination"
      isEditable={false}
      value={state.destinationText}
      playAudio={playAudio}
      pauseAudio={pauseAudio}
      resetAudio={resetAudio}
      audioRef={destinationAudioRef}
      isLoding={state.isFetching}
    />
  );
  return (
    <>
      <HStack spacing={"8"} display={{ base: "none", md: "flex" }}>
        {sourceTranscriptionEditor}
        {destinationTranscriptionEditor}
      </HStack>
      <Tabs
      display=  {{base: 'block', md: 'none'}}
      >
        <TabList
        display={'flex'}
        justifyContent = 'space-between'
        >
          <Tab>Source</Tab>
          <Tab>Destination</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{sourceTranscriptionEditor}</TabPanel>
          <TabPanel>{destinationTranscriptionEditor}</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default TranslationPanel;
