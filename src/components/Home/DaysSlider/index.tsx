import type React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import LeftArrowIcon from "../../../assets/icons/Home/LeftArrow.svg";
import RightArrowIcon from "../../../assets/icons/Home/RightArrow.svg";
import "swiper/css";

import { useTranslation } from "react-i18next";
import type { Swiper as SwiperType } from "swiper";
import DaySlider, {
	AllDaysSlider,
	DayMonthFuture,
	DayOfThMonth,
	DaySliderGroup,
	LiveTodaySlider,
	MyOngoingContest,
	RightLeftArrow,
	TheMonthSlider,
	TodayDayMonth,
	TodayOfThMonth,
	TodayOfThMonthLive,
	TodayTheMonthSlider,
	VictorLeft,
	VictorRight,
} from "./DaysSlider.styles";

function DaysSlider(): React.ReactElement {
	const { t } = useTranslation();
	return (
		<>
			<DaySlider>
				<MyOngoingContest>{t("ongingContst")}</MyOngoingContest>

				<DaySliderGroup>
					<RightLeftArrow>
						<VictorLeft src={LeftArrowIcon} alt="" />
					</RightLeftArrow>

					<AllDaysSlider>
						{/* https://swiperjs.com/react */}
						{/* التصميم جاهز واحد للايام السالبقة وواحد لليوم الحالي وواحد للايام القادمة
          بحتاج لوجك اذا حد شاف الكود وعنده فكرة كيف اعمله بكون كثير شكرا  */}
						<Swiper
							style={{ width: "auto" }}
							spaceBetween={1}
							slidesPerView={5}
							onSlideChange={() => console.log("slide change")}
							onSwiper={(swiper: SwiperType) => console.log(swiper)}
						>
							<SwiperSlide style={{ width: "auto" }}>
								<TodayDayMonth>
									<TodayOfThMonth>12</TodayOfThMonth>
									<TodayTheMonthSlider>{t("ramadan")}</TodayTheMonthSlider>
								</TodayDayMonth>
							</SwiperSlide>

							<SwiperSlide style={{ width: "auto" }}>
								<TodayDayMonth>
									<TodayOfThMonth>13</TodayOfThMonth>
									<TodayTheMonthSlider>{t("ramadan")}</TodayTheMonthSlider>
								</TodayDayMonth>
							</SwiperSlide>

							<SwiperSlide style={{ width: "auto" }}>
								<TodayDayMonth>
									<TodayOfThMonthLive>
										<TodayOfThMonth>14</TodayOfThMonth>
										<LiveTodaySlider />
									</TodayOfThMonthLive>
									<TodayTheMonthSlider>{t("ramadan")}</TodayTheMonthSlider>
								</TodayDayMonth>
							</SwiperSlide>

							<SwiperSlide style={{ width: "auto" }}>
								<DayMonthFuture>
									<DayOfThMonth>15</DayOfThMonth>
									<TheMonthSlider>{t("ramadan")}</TheMonthSlider>
								</DayMonthFuture>
							</SwiperSlide>

							<SwiperSlide style={{ width: "auto" }}>
								<DayMonthFuture>
									<DayOfThMonth>16</DayOfThMonth>
									<TheMonthSlider>{t("ramadan")}</TheMonthSlider>
								</DayMonthFuture>
							</SwiperSlide>

							<SwiperSlide style={{ width: "auto" }}>
								<DayMonthFuture>
									<DayOfThMonth>17</DayOfThMonth>
									<TheMonthSlider>{t("ramadan")}</TheMonthSlider>
								</DayMonthFuture>
							</SwiperSlide>

							<SwiperSlide style={{ width: "auto" }}>
								<DayMonthFuture>
									<DayOfThMonth>18</DayOfThMonth>
									<TheMonthSlider>{t("ramadan")}</TheMonthSlider>
								</DayMonthFuture>
							</SwiperSlide>

							<SwiperSlide style={{ width: "auto" }}>
								<DayMonthFuture>
									<DayOfThMonth>19</DayOfThMonth>
									<TheMonthSlider>{t("ramadan")}</TheMonthSlider>
								</DayMonthFuture>
							</SwiperSlide>
						</Swiper>

						{/* ------------------------------------------------------------- */}

						{/* ------------------------------------------------------------- */}
					</AllDaysSlider>

					<RightLeftArrow>
						<VictorRight src={RightArrowIcon} alt="" />
					</RightLeftArrow>
				</DaySliderGroup>
			</DaySlider>
		</>
	);
}
export default DaysSlider;
