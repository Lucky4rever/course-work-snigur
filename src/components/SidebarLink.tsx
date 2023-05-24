import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // зроби нарешті роути
import styled from "styled-components";
import { Arrow } from ".";

const StyledLink = styled.a`
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  margin-top: 10px;
  padding: 9px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  overflow: hidden;
  border-radius: 12px;
  background-color: var(--workspace-secondary-color);

  > div {
    height: 100%;
    display: flex;
    align-items: center;

    > span {
      height: fit-content;
      font-size: 20px;
    }
  }

  :hover, :active {
    background-color: var(--workspace-tertiary-color);
  }
`;

const LinkLogo = styled.div`
  height: 80%;
  margin-right: 10px;
  aspect-ratio: 1/1;

  > img {
    height: 100%;
  }
`;

interface SidebarLinkProps {
    link: string;
    text?: string | number;
    logo?: any
};

const SidebarLink = ({link, text, logo}: SidebarLinkProps) => {
    const [ifActive, setIfActive] = useState("");
    let location = useLocation();

    useEffect(() => {
        setIfActive(location.pathname === link?  "sidebar-link-active" : "")
    }, [link, location]);
    
    return (
        <StyledLink className={"nav-link "+ ifActive} href={link}>
            <div>
              <LinkLogo>
                <img src={logo} alt="" />
              </LinkLogo>
              <span>{text ?? link}</span>
            </div>
            <Arrow />
        </StyledLink>
    )
};

export default SidebarLink;