'use client'
import React, { createContext, useReducer, useRef, useEffect } from 'react';
import { translateText, getVoiceForText } from '@/common_functions/translationAPIServices';
// Initial state
const initialState = {
  sourceLanguage: 'en',
  destinationLanguage: 'hi',
  sourceText: '',
  destinationText: '',
  sourceSpeech: null,
  destinationSpeech: null,
  isRecording: false,
  isEditing: false,
  previousSourceText: '',
  isFetching: false,
};

// Actions
const SET_SOURCE_LANGUAGE = 'SET_SOURCE_LANGUAGE';
const SET_DESTINATION_LANGUAGE = 'SET_DESTINATION_LANGUAGE';
const SET_SOURCE_TEXT = 'SET_SOURCE_TEXT';
const SET_DESTINATION_TEXT = 'SET_DESTINATION_TEXT';
const SET_SOURCE_SPEECH = 'SET_SOURCE_SPEECH';
const SET_DESTINATION_SPEECH = 'SET_DESTINATION_SPEECH';
const SET_IS_RECORDING = 'SET_IS_RECORDING';
const SET_IS_EDITING = 'SET_IS_EDITING';
const SWAP_LANGUAGES = 'SWAP_LANGUAGES';
const SET_PREVIOUS_SOURCE_TEXT = 'SET_PREVIOUS_SOURCE_TEXT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';

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
    case SET_PREVIOUS_SOURCE_TEXT:
      return { ...state, previousSourceText: state.sourceText };
    case SET_IS_FETCHING:
        return {...state, isFetching: action.payload}
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

  const fetchTranslationAndVoice = async () => {
    if (state.sourceText.trim() && state.sourceText !== state.previousSourceText) {
      dispatch({type: 'SET_IS_FETCHING', payload : true})
      const translation = await translateText(state.sourceText, state.sourceLanguage, state.destinationLanguage);
    //   return Audio object made using URL object
      const sourceVoice = await getVoiceForText(state.sourceText, state.sourceLanguage);
      const destinationVoice = await getVoiceForText(translation, state.destinationLanguage);
      sourceAudioRef.current  = sourceVoice
      destinationAudioRef.current = destinationVoice
      dispatch({ type: SET_DESTINATION_TEXT, payload: translation });
      dispatch({ type: SET_SOURCE_SPEECH, payload: sourceVoice });
      dispatch({ type: SET_DESTINATION_SPEECH, payload: destinationVoice });
      dispatch({ type: SET_PREVIOUS_SOURCE_TEXT });
      dispatch({type: SET_IS_FETCHING, payload : false})
    }
  };

  useEffect(() => {
    // !state.isRecording && !state.isEditing
    console.log(state.isRecording, state.isEditing)
    if ( !state.isRecording && !state.isEditing) {
      fetchTranslationAndVoice();
    }
  }, [state.isRecording, state.isEditing, state.sourceLanguage, state.destinationLanguage]);

  // useEffect(()=>{
  //   console.log(state)
  // }, [state])

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
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(()=>{
    if(state.sourceText == ''){
      dispatch({type:SET_DESTINATION_TEXT, payload: ''})
    }
  }, [state.sourceText])

  return (
    <TranslationContext.Provider
      value={{
        state,
        dispatch,
        sourceAudioRef,
        destinationAudioRef,
        fetchTranslationAndVoice,
        playAudio,
        pauseAudio,
        resetAudio,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};


