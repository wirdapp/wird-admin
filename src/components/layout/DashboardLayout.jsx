import React, { useEffect } from "react";
import Sidebar from "../shared/Sidebar";
import { Container, MainContent } from "./layout.styles";
import Navbar from "../shared/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useDashboardData } from "../../util/routes-data";
import { NoContestYet } from "../Competition/no-contest-yet";

const LayoutContext = React.createContext({
  pageTitle: "",
  setPageTitle: () => {},
});
export const useLayoutContext = () => React.useContext(LayoutContext);

export const DashboardLayout = () => {
  const { currentContest } = useDashboardData();
  const [pageTitle, setPageTitle] = React.useState("");
  const location = useLocation();

  useEffect(() => {
    setPageTitle("");
  }, [location.pathname]);

  return (
    <LayoutContext.Provider value={{ pageTitle, setPageTitle }}>
      <Container>
        <Sidebar />
        <MainContent>
          <Navbar />
          <div className="page-content">
            {currentContest ? <Outlet /> : <NoContestYet />}
          </div>
        </MainContent>
      </Container>
    </LayoutContext.Provider>
  );
};
