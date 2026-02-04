import type React from "react";
import { useTranslation } from "react-i18next";
import CarouselPry from "../../../assets/Carousel/CarouselPry.svg";
import WirdLogo from "../../../assets/Logo/WirdLogosvg.svg";
// import Carousel from 'react-bootstrap/Carousel'
import {
	BorderBottom,
	Introduction,
	IntroductionDiv,
	IntroductionSection,
	IntroductionSectionDiv,
	Stylecom,
	WirdLogoInHome,
	WirdMinIntroduction,
} from "./Img.styles.js";

export default function Img(): React.ReactElement {
	const { t } = useTranslation();
	return (
		<Stylecom>
			<img className="d-block w-100" src={CarouselPry} alt="First slide" />
			<IntroductionSection>
				{/* <Carousel.Caption> */}

				<IntroductionDiv>
					<WirdLogoInHome>
						<img src={WirdLogo} alt="" width="200" />
					</WirdLogoInHome>

					<IntroductionSectionDiv>
						<WirdMinIntroduction> {t("ourName")} </WirdMinIntroduction>
						<Introduction> {t("welcomeMsg")}</Introduction>
					</IntroductionSectionDiv>
				</IntroductionDiv>
				<BorderBottom></BorderBottom>
				<h3>{t("ourName")} </h3>
				<p> {t("welcomeMsg")}</p>
				{/* </Carousel.Caption> */}
			</IntroductionSection>
		</Stylecom>
	);
}
