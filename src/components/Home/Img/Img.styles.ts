import styled from "@emotion/styled";
import {
  IntroductionDiv as DefaultIntroductionDiv,
  BorderBottom as DefaultBorderBottom,
  IntroductionSection as DefaultIntroductionSection,
  IntroductionSectionDiv as DefaultIntroductionSectionDiv,
  WirdMinIntroduction as DefaultWirdMinIntroduction,
  Introduction as DefaultIntroduction,
  WirdLogoInHome as DefaultWirdLogoInHome,
} from "../../shared/styles";

export const Stylecom = styled.div``;

export const IntroductionDiv = styled(DefaultIntroductionDiv)`
  align-items: center;
  margin: auto;
`;

export const BorderBottom = styled(DefaultBorderBottom)`
  margin-right: 0;
`;

// Re-export shared components
export const IntroductionSection = DefaultIntroductionSection;
export const IntroductionSectionDiv = DefaultIntroductionSectionDiv;
export const WirdMinIntroduction = DefaultWirdMinIntroduction;
export const Introduction = DefaultIntroduction;
export const WirdLogoInHome = DefaultWirdLogoInHome;
