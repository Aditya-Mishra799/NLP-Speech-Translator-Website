import React, { useState } from "react";
import { TbCopy } from "react-icons/tb";
import { TbCopyCheckFilled } from "react-icons/tb";
import UtilityButton from "./UtilityButton";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopyButtonClick = () => {
    if (text && text.trim() !== "") {
      navigator.clipboard.writeText(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <UtilityButton
      icon={copied ? <TbCopyCheckFilled /> : <TbCopy />}
      onClick={handleCopyButtonClick}
      color={copied ? "green" : "teal"}
      variant="ghost"
      tooltip={!copied ? `Copy Text` : `Text Copied`}
    />
  );
};

export default CopyButton;
