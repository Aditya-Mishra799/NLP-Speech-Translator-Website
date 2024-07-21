import { getOptions } from "@/common_functions/translationAPIServices";
import { Stack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import Selection from "./Selection";
import SwitchLangButton from "./SwitchLangButton";
import { TranslationContext } from "./TranslationContext";
const LaguageSelector = () => {
  const { state, dispatch, ...rest } = useContext(TranslationContext);
  const [options, setOptions] = useState({})
  const fetchOptions = async ()=>{
    const optionsData = await getOptions()
    setOptions(optionsData)
  }
  useEffect(()=>{
    fetchOptions()
  }, [])
  return (
    <Stack
      direction={"row"}
      align="center"
      spacing={{ base: "2", md: "6" }}
      bg="gray.50"
      p={{base: '3',sm : '6',  md: '8'}}
      borderRadius="full"
      justifyContent={"space-between"}
      width={{ base: "120", sm : 'md',md: "xl" }}
    >
      <Selection
        options={options}
        value={state.sourceLanguage}
        setValue={(value) =>
          dispatch({ type: "SET_SOURCE_LANGUAGE", payload: value })
        }
        placeholder={"Select source"}
      />
      <SwitchLangButton onClick={() => dispatch({ type: "SWAP_LANGUAGES" })} />
      <Selection
        options={options}
        value={state.destinationLanguage}
        setValue={(value) =>
          dispatch({ type: "SET_DESTINATION_LANGUAGE", payload: value })
        }
        placeholder={"Select destinaton"}
      />
    </Stack>
  );
};

export default LaguageSelector;
