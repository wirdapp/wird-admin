import React, { useCallback } from "react";

import LeftArrowIcon from "../../../assets/icons/Home/LeftArrow.svg";
import RightArrowIcon from "../../../assets/icons/Home/RightArrow.svg";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

import DaySlider, {
  MyOngoingContest,
  DaySliderGroup,
  RightLeftArrow,
  AllDaysSlider,
  VictorLeft,
  VictorRight,
  DayMonthFuture,
  DayOfThMonth,
  TheMonthSlider,
  TodayDayMonth,
  TodayOfThMonth,
  TodayTheMonthSlider,
  LiveTodaySlider,
  TodayOfThMonthLive,
} from "./DaysSlider.styles";
import { useTranslation } from "react-i18next";


function DaysSlider() {
  const [swiper, setSwiper] = React.useState(null);
  const { t } = useTranslation();


  const dateTransferFormat = (day = 1) => {

    const myFormat = 'en-u-ca-islamic-umalqura-nu-latn';
    const today = new Date()
    const dayOfMonth = today.getDate() + day;
    const yearNow = today.getFullYear();
    const monthNow = today.getMonth();
    const options = { day: 'numeric', month: 'numeric' };
    const date = new Date(`${monthNow + 1}/${dayOfMonth}/${yearNow}`);
    const formattedDate = new Intl.DateTimeFormat(myFormat, options).format(date);
    // Extracting day and month from formatted date
    const formattedDateParts = formattedDate.split('/'); // Assuming the date format is MM/DD/YYYY
    const extractedDay = formattedDateParts[1]; // Index 1 corresponds to the day
    const extractedMonth = formattedDateParts[0]; // Index 0 corresponds to the month
    return { extractedDay, extractedMonth }

  }

  const nexTo = () => swiper.slideNext();
  const prevTo = () => swiper.slidePrev()
  const isMobile = !swiper?.device?.android && !swiper?.device?.ios
  return (
    <>
      <DaySlider>
        <MyOngoingContest>{t("ongingContst")}</MyOngoingContest>

        <DaySliderGroup>
          {isMobile ? <RightLeftArrow onClick={prevTo} >
            <VictorLeft src={LeftArrowIcon} Alt="arrow-right" />
          </RightLeftArrow> : null}

          <AllDaysSlider>
            <Swiper
              spaceBetween={1}
              slidesPerView={5}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(s) => {
                setSwiper(s);
              }}
            >
              {
                [-3, -2, -1, 0, 1, 2, 3, 4].map(day => {


                  const { extractedDay, extractedMonth } = dateTransferFormat(day)

                  const translationKey = t(`hijri.${extractedMonth}`)
                  if (!day) {
                    return (
                      <>

                        <SwiperSlide key={day}>
                          <TodayDayMonth>
                            <TodayOfThMonthLive>
                              <TodayOfThMonth width={"1.25rem"}>{extractedDay}</TodayOfThMonth>
                              <LiveTodaySlider />
                            </TodayOfThMonthLive>
                            <TodayTheMonthSlider>{translationKey} </TodayTheMonthSlider>
                          </TodayDayMonth>
                        </SwiperSlide>
                      </>
                    )
                  } else if (day > 0) {
                    return (
                      <>

                        <SwiperSlide style={{ width: "auto" }} key={day}>
                          <DayMonthFuture>
                            <DayOfThMonth>{extractedDay}</DayOfThMonth>
                            <TheMonthSlider>{translationKey}</TheMonthSlider>
                          </DayMonthFuture>
                        </SwiperSlide>
                      </>

                    )
                  }
                  return (
                    <>

                      <SwiperSlide key={day}>
                        <TodayDayMonth>
                          <TodayOfThMonth>{extractedDay}</TodayOfThMonth>
                          <TodayTheMonthSlider>{translationKey}</TodayTheMonthSlider>
                        </TodayDayMonth>
                      </SwiperSlide>

                    </>
                  )
                })
              }
            </Swiper>

            {/* ------------------------------------------------------------- */}

            {/* ------------------------------------------------------------- */}
          </AllDaysSlider>

          {isMobile ? <RightLeftArrow onClick={nexTo}>
            <VictorRight src={RightArrowIcon} Alt="arrow-right" />
          </RightLeftArrow> : null}
        </DaySliderGroup>
      </DaySlider>
    </>
  );
}
export default DaysSlider;
