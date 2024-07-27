"use client";
import React from "react";
import { TranslationProvider } from "@/components/TranslationContext";
import { Stack, Text } from "@chakra-ui/react";
import LaguageSelector from "@/components/LaguageSelector";
import TranslationPanel from "@/components/TranslationPanel";
import dynamic from 'next/dynamic';
import 'regenerator-runtime/runtime'
const SpeechRecognition = dynamic(() => import('@/components/SpeechRecognition'), {
  ssr: false,
});
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
    </Stack>
    </TranslationProvider>
  );
};

export default HomePage;
