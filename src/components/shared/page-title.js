import {createPortal} from "react-dom";

export const PageTitle = ({children}) => {
  if (document.getElementById("dashboard-page-title") === null) {
    return null;
  }
  return createPortal(children, document.getElementById("dashboard-page-title"));
}