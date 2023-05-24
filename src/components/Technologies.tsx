import React from "react";
import styled from "styled-components";

const Layout = styled.a`
    box-sizing: border-box;
    width: 120px;
    height: 160px;
    margin: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    text-decoration: none;
    color: black;
    border: 1px solid var(--workspace-secondary-color);
    border-radius: 15px;

    :active {
        border: 2px solid var(--workspace-tertiary-color);
    }

    > img {
        width: 100%;
        aspect-ratio: 1/1;
        border-radius: 14px;
    }

    > span {
        display: block;
        width: fit-content;
        margin: auto;

        font-size: 18px;
    }
`;

interface TechnologiesProps {
    img: string;
    name: string;
    link?: string;
}

const Technologies = ({img, name, link}: TechnologiesProps) => {
  

  return (
    <Layout href={link}>
        <img src={img} alt="None" />
        <span>{name}</span>
    </Layout>
  );
};

export default Technologies;
