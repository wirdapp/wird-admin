import type React from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useTranslation } from "react-i18next";
import CarouselPry from "../../../assets/Carousel/CarouselPry.svg";
import WirdLogo from "../../../assets/Logo/WirdLogosvg.svg";
import {
	BorderBottom,
	Introduction,
	IntroductionDiv,
	IntroductionSection,
	IntroductionSectionDiv,
	WirdLogoInHome,
	WirdMinIntroduction,
} from "../../shared/styles";
import { CarouselStyle } from "./CarouselStatistics.styles.js";

export default function CarouselStatistics(): React.ReactElement {
	const [index, setIndex] = useState<number>(0);
	const { t } = useTranslation();
	const handleSelect = (selectedIndex: number, e: unknown): void => {
		// setIndex(selectedIndex);
	};

	return (
		<CarouselStyle>
			<Carousel activeIndex={index} onSelect={handleSelect}>
				<Carousel.Item>
					<img className="d-block w-100" src={CarouselPry} alt="First slide" />
					{/* <Carousel.Caption> */}
					<IntroductionSection>
						<Carousel.Caption>
							<IntroductionDiv>
								<WirdLogoInHome>
									<img src={WirdLogo} alt="" width="200" />
								</WirdLogoInHome>

								<IntroductionSectionDiv>
									<WirdMinIntroduction>{t("ourName")}</WirdMinIntroduction>
									<Introduction>{t("welcomeMsg")}</Introduction>
								</IntroductionSectionDiv>
							</IntroductionDiv>
							<BorderBottom></BorderBottom>
							<h3>{t("ourName")}</h3>
							<p>{t("welcomeMsg")} </p>
						</Carousel.Caption>
					</IntroductionSection>

					{/* </Carousel.Caption> */}
				</Carousel.Item>

				<Carousel.Item>
					<img className="d-block w-100" src={CarouselPry} alt="First slide" />
					{/* <Carousel.Caption> */}
					<IntroductionSection>
						<Carousel.Caption>
							<IntroductionDiv>
								<WirdLogoInHome>
									<img src={WirdLogo} alt="" width="200" />
								</WirdLogoInHome>

								<IntroductionSectionDiv>
									<WirdMinIntroduction>{t("ourName")}</WirdMinIntroduction>
									<Introduction>{t("welcomeMsg")}</Introduction>
								</IntroductionSectionDiv>
							</IntroductionDiv>
							<BorderBottom></BorderBottom>
						</Carousel.Caption>
					</IntroductionSection>
					<h3>{t("ourName")}</h3>
					<p>{t("welcomeMsg")}</p>
					{/* </Carousel.Caption> */}
				</Carousel.Item>

				<Carousel.Item>
					<img className="d-block w-100" src={CarouselPry} alt="First slide" />
					{/* <Carousel.Caption> */}
					<IntroductionSection>
						<Carousel.Caption>
							<IntroductionDiv>
								<WirdLogoInHome>
									<img src={WirdLogo} alt="" width="200" />
								</WirdLogoInHome>

								<IntroductionSectionDiv>
									<WirdMinIntroduction>{t("ourName")}</WirdMinIntroduction>
									<Introduction>{t("welcomeMsg")}</Introduction>
								</IntroductionSectionDiv>
							</IntroductionDiv>
							<BorderBottom></BorderBottom>
						</Carousel.Caption>
					</IntroductionSection>
					<h3>{t("ourName")}</h3>
					<p>{t("welcomeMsg")}</p>
					{/* </Carousel.Caption> */}
				</Carousel.Item>
			</Carousel>
		</CarouselStyle>
	);
}
