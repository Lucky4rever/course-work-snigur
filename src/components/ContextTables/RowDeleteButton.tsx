import React, { useState } from "react";
import styled from "styled-components";
import yes from "../../assets/img/YesButton.svg";
import no from "../../assets/img/NoButton.svg";
import remove from "../../assets/img/RemoveButton.svg";
import { customRequest } from "../../helpers/Neo4jDriver";

const ButtonLayout = styled.div`
    width: 60px;
    height: 30px;
    display: grid !important;
    grid-auto-rows: 30px 30px;
    justify-items: end;

    img {
        box-sizing: border-box;
        height: 80%;
        aspect-ratio: 1/1;
        margin: 5%;
    }

    > img {
        display: block;
    }

    > div {
        display: none;
        width: 100%;
        height: 100%;
    }
`;

interface RowDeleteProps {
    request: string;
}

const RowDeleteButton = ({request}: RowDeleteProps) => {
    let [isDelete, setIsDelete] = useState(false);
    function handleClickChanger() {
        setIsDelete(!isDelete);
    }

    function sendDeleteRequest() {
        customRequest(request);
    }

    return (
    <ButtonLayout onClick={handleClickChanger}>
        <img style={{display: isDelete? "none" : "block"}} src={remove} alt="" />
        <div style={{display: isDelete? "block" : "none"}}>
            <img src={yes} onClick={sendDeleteRequest} alt="" />
            <img src={no} onClick={handleClickChanger} alt="" />
        </div>
    </ButtonLayout>
    );
};

export default RowDeleteButton;
