import styled from "@emotion/styled";

export default styled.div`
  margin: auto;
  margin-top: 3rem;
  width: 100%;
  /* width: auto; */

  /* position: relative; */
  /* width: 59.3125rem; */
  border-radius: 1.5rem;
  max-width: 59.375rem;

  @media (max-width: 37.5625rem) {
  }
`;

export const MyOngoingContest = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.8125rem;

  color: #000000;

  @media (max-width: 37.5625rem) {
  }
`;

export const DaySliderGroup = styled.div`
  /* margin-top: 3rem; */
  display: flex;
  align-items: center;
  /* position: relative; */
  width: auto;
  justify-content: space-between;
  /* overflow: hidden; */

  @media (max-width: 37.5625rem) {
  }
`;

export const RightLeftArrow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.125rem;
  gap: 0.75rem;

  width: 3.75rem;
  height: 3.75rem;

  background: #f9eaea;
  border-radius: 6.25rem;

  @media (max-width: 37.5625rem) {
  }
`;

export const VictorLeft = styled.img`
  color: #000000;
  margin: auto;

  @media (max-width: 37.5625rem) {
  }
`;

export const VictorRight = styled.img`
  color: #000000;
  margin: auto;

  @media (max-width: 37.5625rem) {
  }
`;

export const AllDaysSlider = styled.div`
  /* width: auto; */
  /* width: 10rem; */
  width: 90%;

  height: 9rem;
  /* position: absolute; */
  left: 3rem;
  overflow: hidden;

  padding: 0rem;
  gap: 1.25rem;
  max-width: 49.3125rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
  /* margin-left: 3rem;
margin-right: 3rem; */

  @media (max-width: 37.5625rem) {
  }
`;

export const DayMonthFuture = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.125rem;
  gap: 0.375rem;

  width: 7.125rem;
  height: 5.625rem;
  background: #ffffff00;
  opacity: 0.24;
  border-radius: 0.75rem;

  :focus {
  }
  @media (max-width: 37.5625rem) {
  }
`;

export const DayOfThMonth = styled.div`
  width: 1.5625rem;
  height: 1.8125rem;

  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.8125rem;
  text-align: center;

  color: #000000;

  @media (max-width: 37.5625rem) {
  }
`;

export const TheMonthSlider = styled.div`
  width: 4.875rem;
  height: 1.1875rem;

  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;
  text-align: center;

  color: #a79f97;

  @media (max-width: 37.5625rem) {
  }
`;

export const TodayDayMonth = styled.button`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  padding: 1.125rem;
  gap: 0.375rem;

  width: 7.125rem;
  height: 5.625rem;
  background: #ffffff00;
  border-radius: 0.75rem;

  :focus {
    background: #ffffff;
    box-shadow: 0rem 0.75rem 1.5rem rgba(167, 159, 151, 0.24);
  }
  @media (max-width: 37.5625rem) {
  }
`;

export const TodayOfThMonth = styled.div`
  display: flex;

  width: 1.25rem;
  height: 1.8125rem;

  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.8125rem;
  text-align: center;

  color: #000000;

  @media (max-width: 37.5625rem) {
  }
`;

export const TodayOfThMonthLive = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0rem;
  gap: 0.375rem;

  width: 2.6875rem;
  height: 1.8125rem;
  @media (max-width: 37.5625rem) {
  }
`;

export const TodayTheMonthSlider = styled.div`
  width: 4.875rem;
  height: 1.1875rem;

  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.25rem;
  text-align: center;

  color: #a79f97;

  @media (max-width: 37.5625rem) {
  }
`;

export const LiveTodaySlider = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 1.875rem;
  margin-left: 0.3125rem;
  background: #ff5367;

  @media (max-width: 37.5625rem) {
  }
`;
