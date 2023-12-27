import React from "react";
import Container, {LoaderAnimation} from "./loder.styles";
import {useTranslation} from "react-i18next";

export default function Loader() {
  const {t} = useTranslation();

  return (
    <Container>
      <LoaderAnimation/>
      <span>{t("loading")}</span>
    </Container>
  );
}
