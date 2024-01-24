import React from "react";
import { useTranslation } from "react-i18next";
import { AnimatedPage } from "../../ui/animated-page";
import { Col, Row, Typography } from "antd";
import { css } from "@emotion/css";
import { SectionsList } from "./sections/sections-list";
import { ContestCriteriaProvider } from "./contest-criteria-context";
import { ContestPreview } from "./contest-preview";

export function ContestCriteria() {
  const { t } = useTranslation();

  return (
    <AnimatedPage>
      <ContestCriteriaProvider>
        <Row gutter={24}>
          <Col
            span={24}
            lg={14}
            className={css`
              margin-bottom: 16px;
            `}
          >
            <SectionsList />
          </Col>
          <Col span={24} lg={10}>
            <div
              className={css`
                @media (min-width: 992px) {
                  position: sticky;
                  top: 16px;
                }
              `}
            >
              <Typography.Title level={3}>{t("preview")}</Typography.Title>
              <div
                className={css`
                  padding: 16px;
                  background-color: #f0f2f5;
                  min-height: 200px;
                `}
              >
                <ContestPreview />
              </div>
            </div>
          </Col>
        </Row>
      </ContestCriteriaProvider>
    </AnimatedPage>
  );
}
