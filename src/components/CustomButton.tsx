import React from "react";
import styled from "styled-components";

const LinkButtonLayout = styled.a`
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: 120px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--workspace-primarly-color);
    outline: 1px solid var(--auxiliary-elements-color);
    background-color: var(--workspace-secondary-color);
    border-radius: 10px;
    text-decoration: none;
    user-select: none;

    > span {
        width: fit-content;
        height: fit-content;
    }

    :active {
        background-color: var(--workspace-tertiary-color);
    }
`;

interface LinkButtonProps {
    href?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "submit"
}

const CustomButton = ({href, children, onClick, type}: LinkButtonProps) => {
  return (<LinkButtonLayout href={href} onClick={onClick}><span>{children}</span></LinkButtonLayout>);
};

export default CustomButton;
