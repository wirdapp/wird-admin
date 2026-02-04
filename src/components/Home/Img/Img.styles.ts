import styled from "@emotion/styled";
import {
	BorderBottom as DefaultBorderBottom,
	Introduction as DefaultIntroduction,
	IntroductionDiv as DefaultIntroductionDiv,
	IntroductionSection as DefaultIntroductionSection,
	IntroductionSectionDiv as DefaultIntroductionSectionDiv,
	WirdLogoInHome as DefaultWirdLogoInHome,
	WirdMinIntroduction as DefaultWirdMinIntroduction,
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
