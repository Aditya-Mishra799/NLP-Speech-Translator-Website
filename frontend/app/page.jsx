"use client";
import React from "react";
import { TranslationProvider } from "@/components/TranslationContext";
import { Stack, Text } from "@chakra-ui/react";
import LaguageSelector from "@/components/LaguageSelector";
import TranslationPanel from "@/components/TranslationPanel";
import SpeechRecognition from "@/components/SpeechRecognition";

const HomePage = () => {
  return (
    <TranslationProvider>
      <Stack 
      direction={'column'}
      spacing = '8'
      padding={4}
      w  = 'full'
      align={'center'}
      >
        <Text 
        fontSize = {'xx-large'}
        fontWeight = 'bold'
        >Translate Your voice</Text>
        <LaguageSelector />
        <TranslationPanel />
        <SpeechRecognition />
        
        Home
    </Stack>
    </TranslationProvider>
  );
};

export default HomePage;
