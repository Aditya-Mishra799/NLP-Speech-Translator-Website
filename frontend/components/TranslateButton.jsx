import React, { useContext } from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { TranslationContext } from './TranslationContext';
import UtilityButton from './UtilityButton';

const TranslateButton = () => {
    const {fetchTranslationOnTextChange} = useContext(TranslationContext)
    return (
        <UtilityButton
          icon={<FaArrowRightLong />}
          color={"blue"}
          variant="ghost"
          tooltip={"Translate Text"}
          isRound = {false}
          onClick = {fetchTranslationOnTextChange}
        />
      );
}

export default TranslateButton
