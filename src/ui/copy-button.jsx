import React, { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../styles";
import { CheckIcon, LinkIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useTranslation } from "react-i18next";

const StyledCopyButtonWrapper = styled.div`
  button {
    font-size: 12px;
    padding: 0;
    min-width: 0;

    svg {
      width: 14px;
    }
  }

  .copied {
    color: ${colors.yellow};

    svg {
      width: 14px;
    }
  }
`;

export const CopyButton = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const onCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <StyledCopyButtonWrapper>
      {copied ? (
        <span className="copied">
          <CheckIcon />
          {t("copied")}
        </span>
      ) : (
        <Button variant="link" onClick={onCopy}>
          <LinkIcon />
        </Button>
      )}
    </StyledCopyButtonWrapper>
  );
};
