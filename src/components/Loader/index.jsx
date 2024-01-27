import React from "react";
import Container from "./loder.styles";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";

export default function Loader() {
  const { t } = useTranslation();

  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
}
