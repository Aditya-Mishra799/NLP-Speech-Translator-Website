"use client";
import React, { createContext, useReducer, useRef, useEffect, useState } from "react";
import {
  translateText,
  getVoiceForText,
} from "@/common_functions/translationAPIServices";
// Initial state
const initialState = {
  sourceLanguage: "en",
  destinationLanguage: "hi",
  sourceText: "",
  destinationText: "",
  isRecording: false,
  isEditing: false,
  isFetching: false,
};

// Actions
const SET_SOURCE_LANGUAGE = "SET_SOURCE_LANGUAGE";
const SET_DESTINATION_LANGUAGE = "SET_DESTINATION_LANGUAGE";
const SET_SOURCE_TEXT = "SET_SOURCE_TEXT";
const SET_DESTINATION_TEXT = "SET_DESTINATION_TEXT";
const SET_SOURCE_SPEECH = "SET_SOURCE_SPEECH";
const SET_DESTINATION_SPEECH = "SET_DESTINATION_SPEECH";
const SET_IS_RECORDING = "SET_IS_RECORDING";
const SET_IS_EDITING = "SET_IS_EDITING";
const SWAP_LANGUAGES = "SWAP_LANGUAGES";
const SET_IS_FETCHING = "SET_IS_FETCHING";

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case SET_SOURCE_LANGUAGE:
      return { ...state, sourceLanguage: action.payload };
    case SET_DESTINATION_LANGUAGE:
      return { ...state, destinationLanguage: action.payload };
    case SET_SOURCE_TEXT:
      return { ...state, sourceText: action.payload };
    case SET_DESTINATION_TEXT:
      return { ...state, destinationText: action.payload };
    case SET_SOURCE_SPEECH:
      return { ...state, sourceSpeech: action.payload };
    case SET_DESTINATION_SPEECH:
      return { ...state, destinationSpeech: action.payload };
    case SET_IS_RECORDING:
      return { ...state, isRecording: action.payload };
    case SET_IS_EDITING:
      return { ...state, isEditing: action.payload };
    case SWAP_LANGUAGES:
      return {
        ...state,
        sourceLanguage: state.destinationLanguage,
        destinationLanguage: state.sourceLanguage,
        sourceText: state.destinationText,
        destinationText: state.sourceText,
      };
    case SET_IS_FETCHING:
      return { ...state, isFetching: action.payload };
    default:
      return state;
  }
};

// Create context
export const TranslationContext = createContext();

// Provider component
export const TranslationProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const sourceAudioRef = useRef(null);
  const destinationAudioRef = useRef(null);
  const prevStateRef = useRef({});

  const fetchTranslationOnLangChange = async () => {
    console.log('Fetching Lang---------------------------------')
    console.log("Prev State",prevStateRef.current)
    console.log("Curr State: ",state)
    console.log('Fetching Lang---------------------------------')

    dispatch({ type: SET_IS_FETCHING, payload: true });

    const prevState = prevStateRef.current;

    if (prevState?.sourceLanguage != state.sourceLanguage && state.sourceText.trim() != '') {
      const translation = await translateText(
        state.sourceText,
        prevState?.sourceLanguage,
        state.sourceLanguage
      );
      dispatch({ type: SET_SOURCE_TEXT, payload: translation });
      const voice = await getVoiceForText(
        translation,
        state.sourceLanguage
      );
      sourceAudioRef.current = voice;
    }
    if (prevState?.destinationLanguage != state.destinationLanguage && state.destinationText.trim()  != '') {
      const translation = await translateText(
        state.destinationText,
        prevState?.destinationLanguage,
        state.destinationLanguage
      );
      dispatch({ type: SET_DESTINATION_TEXT, payload: translation });
      const voice = await getVoiceForText(
        translation,
        state.destinationLanguage
      );
      destinationAudioRef.current = voice;
    }
    dispatch({ type: SET_IS_FETCHING, payload: false });
    prevStateRef.current = state
  };

  const fetchTranslationOnTextChange = async () => {
    if(!state.isEditing && !state.isRecording){
      console.log('text Change')
    dispatch({ type: SET_IS_FETCHING, payload: true });

    const prevState = prevStateRef.current;

    if (
      state.sourceText.trim() &&
      prevState?.sourceText != state.sourceText &&
      state.sourceText !== ""
    ) {
      const translation = await translateText(
        state.sourceText,
        state.sourceLanguage,
        state.destinationLanguage
      );
      dispatch({ type: SET_DESTINATION_TEXT, payload: translation });
      const sourceVoice = await getVoiceForText(
        state.sourceText,
        state.sourceLanguage
      );
      const destVoice = await getVoiceForText(
        translation,
        state.destinationLanguage
      );
      sourceAudioRef.current = sourceVoice;
      destinationAudioRef.current = destVoice;
    }
    dispatch({ type: SET_IS_FETCHING, payload: false });
    prevStateRef.current = state
  }
  };
  useEffect(() => {
    fetchTranslationOnLangChange();
  }, [state.sourceLanguage, state.destinationLanguage]);

  useEffect(() => {
    if (!state.isEditing && !state.isRecording) {
      fetchTranslationOnTextChange();
    }
  }, [state.isEditing, state.isRecording]);

  const playAudio = (audioRef) => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const pauseAudio = (audioRef) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const resetAudio = (audioRef) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  // clear the destination text if source becomes empty

  // useEffect(() => {
  //   if (state.sourceText == "") {
  //     dispatch({ type: SET_DESTINATION_TEXT, payload: "" });
  //   }
  // }, [state.sourceText]);

  return (
    <TranslationContext.Provider
      value={{
        state,
        dispatch,
        sourceAudioRef,
        destinationAudioRef,
        playAudio,
        pauseAudio,
        resetAudio,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
