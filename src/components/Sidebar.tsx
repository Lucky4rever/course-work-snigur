import React from "react";
import { BrowserRouter } from "react-router-dom"; // зроби нарешті роути
import styled from "styled-components";
import { SidebarLink } from ".";
import { home, lists } from "../assets/img";
import { ua as lang } from "../assets/langs/index";

const SidebarLayout = styled.div`
  position: relative;
  width: 54px;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  z-index: 1;
  background-color: var(--workspace-secondary-color);
  transition: 500ms;

  :hover {
    width: 200px;
  }
`;

const SidebarBrowserRouter = styled.div`
  position: sticky;
  width: 80%;
  top: 0%;
`;

const Sidebar = () => {
  return (
    <SidebarLayout>
      <SidebarBrowserRouter>
        <BrowserRouter>
          <SidebarLink link="/" text={lang["Pages"].Home} logo={home} />
          <SidebarLink link="/lists/" text={lang["Pages"].Lists} logo={lists} />
          {/* <SidebarLink link="/requests/" text={lang["Pages"].Requests} logo={requests} /> */}
        </BrowserRouter>
      </SidebarBrowserRouter>
    </SidebarLayout>
  );
};

export default Sidebar;
