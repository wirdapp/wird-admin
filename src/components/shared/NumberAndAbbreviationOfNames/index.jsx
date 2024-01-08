import React from "react";
import {
  MemberImgsAndNumNumbers,
  MemberNumbers,
  MembersImg,
  MembersImgs,
} from "../../Home/TopRanks/TopRanks.styles";
import { getInitials } from "../../../util/user-utils";

function NumberAndAbbreviationOfNames(props) {
  const styles = [
    { background: "#FDD561", right: "80px", color: "black" },
    { background: "#FF5367", right: "50px", color: "white" },
    { background: "#503E9D", right: "20px", color: "#FDD561" },
  ];
  return (
    <MemberImgsAndNumNumbers>
      <MembersImgs>
        {props.users.slice(0, 3).map((user, i) => {
          return (
            <MembersImg key={i} style={styles[i]}>
              {getInitials(user.person_info)}
            </MembersImg>
          );
        })}
      </MembersImgs>

      {props.users.length - 3 > 0 && (
        <MemberNumbers>+{props.users.length - 3}</MemberNumbers>
      )}
    </MemberImgsAndNumNumbers>
  );
}

export default NumberAndAbbreviationOfNames;
