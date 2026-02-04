import styled from "@emotion/styled";
import { colors } from "styles";
import { Link } from "react-router-dom";

export default styled.header`
  z-index: 2;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 3.5rem;
  width: 100%;
`;

export const A = styled.h4`
  transition: all 0.3s ease 0s;
  font-size: 1.3rem;
  color: #2980b9;
  padding-top: 0.5rem;
  @media (max-width: 750px) {
    justify-content: center;
    align-items: center;
    display: none;
  }
`;

export const StyledPageTitle = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  text-align: start;

  &:empty {
    display: none;
  }
`;

export const RightNavItems = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  justify-content: flex-end;
`;

export const LeftNavItems = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`;

export const Container = styled.div`
  position: relative;
`;

export const UserName = styled.p`
  font-weight: 700;
`;

export const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  padding: 16px 16px 0;
  gap: 32px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 16px;
  }

  .menu-button {
    padding: 0.625rem;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 16px;
    inset-inline-start: 16px;
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

export const MenuIcon = styled.a`
  padding: 0.625rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  inset-inline-start: 0;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const SidebarMenu = styled.div`
  visibility: hidden;
  pointer-events: none;
  position: fixed;
  inset-inline-start: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 998;
  transition: all 0.3s ease-in-out;

  &::-webkit-scrollbar {
    display: none;
  }

  aside {
    margin: 0;
    position: absolute;
    transition: all 0.3s ease-in-out;
    inset-inline-start: -100%;
    display: block;
    border-radius: 0;
    height: 100%;
    overflow-x: scroll;
    width: 75vw;
    max-width: 300px;
    padding: 16px;
  }

  &.open {
    visibility: visible;
    pointer-events: auto;
    background-color: rgba(150, 150, 150, 0.5);

    aside {
      inset-inline-start: 0;
      box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    }
  }
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const List = styled.ul`
  margin: 1rem 0;
  padding: 0;
  list-style: none;
  color: ${colors.darkGrey};
  /* right: ; */
`;

export const ListItem = styled.li`
  margin: 0;
  padding: 0.5rem 0.2rem;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: ${colors.lightRed};
  }

  & svg {
    height: 1.5rem;
    width: 1.5rem;
    color: #fb6e3a;
  }
`;

export const MenuTitle = styled.span`
  /* font-size: large; */

  a {
    text-decoration: none;
    color: ${colors.darkGrey};
  }
`;

export const LinkElement = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${colors.black};
  font-weight: 700;

  &:focus {
    color: ${colors.black};
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.5rem;

  .ant-avatar {
    flex-shrink: 0;
  }
`;

export const CloseIcon = styled.i`
  cursor: pointer;
`;

interface ProfilePictureProps {
  src?: string;
}

export const ProfilePicture = styled.div<ProfilePictureProps>`
  /* position: relative; */
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background-color: ${colors.yellow};
  border-radius: 1rem;
  background-image: ${(props) => `url(${props.src})`};
  background-repeat: no-repeat;
  background-size: cover;
  font-weight: 700;
  text-transform: uppercase;
`;

export const ProfileName = styled.div`
  font-weight: 700;
`;
