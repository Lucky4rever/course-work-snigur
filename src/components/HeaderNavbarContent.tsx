import { useLocation } from "react-router-dom";
import { Arrow } from ".";
import styled from "styled-components";
import { useMemo } from "react";

const NavbarElement = styled.div`
    margin-right: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    
    font-size: 28px;
    color: #EEFFF0;
`;

const NavbarContent = styled.div`
    min-width: fit-content;
    margin: 10px 0;
    display: flex;
    flex-direction: row;
`;


interface NavbarElementProps {
    pathname: string;
    pathpart: string;
}

const HeaderNavbarElement = ({pathname, pathpart}: NavbarElementProps) => {
    return (
        <NavbarElement>
            <Arrow />
            <a className="nav-link" href={pathname}>{pathpart}</a>
        </NavbarElement>
    );
};

const HeaderNavbarContent = () => {
    let location = useLocation();
    const parts = useMemo(() => {
        return location.pathname
            .split('/')
            .filter(part => part !== '');
    }, [location.pathname]);
    
    let path = "/";

    return (
        <NavbarContent>
            {
                parts.map((part, index) => {
                    path += part + '/';
                    return (
                        <HeaderNavbarElement key={index} pathname={path} pathpart={part} />
                    )
                })
            }
        </NavbarContent>
    )
};

export default HeaderNavbarContent;
