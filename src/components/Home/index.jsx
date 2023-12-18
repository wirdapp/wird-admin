import React, {useEffect, useState} from "react";
import {HomeContainer} from "./home.styles";

import {retrieveTopMembers} from "../../services/competitionsServices";
import Loader from "../Loader";
import HomeBanner from "./HomeBanner";
import TopRanks from "./TopRanks";
import {retrieveStudents} from "../../services/studentsServices";
import {useDashboardData} from "../../util/routes-data";
import {PageTitle} from "../shared/page-title";
import {useTranslation} from "react-i18next";

function Home() {
  const {currentUser} = useDashboardData();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [topMembers, setTopMembers] = useState([]);

  useEffect(() => {
    setLoading(true);

    retrieveTopMembers(
      (res) => {
        if (res && res.status === 200) {
          setTopMembers(res.data);
        }
      },
      (err) => {
        console.log("Failed to retrieve top members : ", err.data);
      }
    );

    retrieveStudents(
      (res) => {
        if (res && res.status === 200) {
          setStudents(res.data);
          setLoading(false);
        }
      },
      (err) => {
        console.log("Failed to retrieve students : ", err.data);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <main>
        <Loader/>
      </main>
    );
  }

  return (
    <>
      <PageTitle>{t('home-page')}</PageTitle>
      <HomeContainer>
        <HomeBanner
          name={
            currentUser?.first_name?.length > 0
              ? currentUser.first_name +
              " " +
              currentUser.last_name
              : "Admin"
          }
          dayNumber={"1"}
        />
        {/* <DaysSlider /> */}
        <TopRanks students={students} topMembers={topMembers}/>
      </HomeContainer>
    </>
  );
}

export default Home;
