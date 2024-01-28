import React from "react";
import {
  MemberImgsAndNumNumbers,
  MemberNumbers,
} from "../../Home/TopRanks/TopRanks.styles";
import { getInitials } from "../../../util/user-utils";
import { Avatar } from "antd";

const styles = [
  { background: "#FDD561", color: "black" },
  { background: "#FF5367", color: "white" },
  { background: "#503E9D", color: "#FDD561" },
];

function NumberAndAbbreviationOfNames(props) {
  return (
    <MemberImgsAndNumNumbers>
      <Avatar.Group>
        {props.users.slice(0, 3).map((user, i) => {
          return (
            <Avatar key={i} style={styles[i]}>
              {getInitials(user.person_info)}
            </Avatar>
          );
        })}
      </Avatar.Group>

      {props.users.length - 3 > 0 && (
        <MemberNumbers>+{props.users.length - 3}</MemberNumbers>
      )}
    </MemberImgsAndNumNumbers>
  );
}

export default NumberAndAbbreviationOfNames;
