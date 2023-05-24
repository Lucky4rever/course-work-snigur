import React from "react";
import styled from "styled-components";
import { logo } from "../assets/img";
import { BrowserRouter } from "react-router-dom";
import { HeaderNavbarContent } from ".";

const HeaderLayout = styled.header`
    position: static;
    width: 100%;
    min-width: fit-content;
    height: 45px;
    display: flex;

    z-index: 2;
    background-color: var(--workspace-tertiary-color);
`;

const Collapse = styled(BrowserRouter)`
    height: 100%;
    min-width: fit-content;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    user-select: none;
`;

const Logo = styled.a`
    height: 80%;
    margin: 5px 10px;
    user-select: none;

    > img {
        width: 100%;
        height: 100%;
    }
`;

const Header = () => {

    return (
        <HeaderLayout>
            <Collapse>
                <Logo href="/">
                    <img src={logo} alt="Logo" />
                </Logo>
                
                <HeaderNavbarContent />
            </Collapse>
        </HeaderLayout>
    );
};

export default Header;
