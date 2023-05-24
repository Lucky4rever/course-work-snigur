import { vinnitsia } from "../assets/img"
import styled from "styled-components";
import { Technologies } from "../components";
import { React, TS, Neo4j, Csharp } from "../assets/img";
import { ua as lang } from "../assets/langs";
import { useEffect } from "react";

const Layout = styled.div`
    position: relative;
    width: auto;
    height: auto;
`;

const Background = styled.div`
    position: relative;
    height: auto;
    background-image: url(${vinnitsia});
    background-position-y: 70%;
    background-size: cover;
    background-attachment: fixed;
`;

const SiteTitle = styled.div`
    width: 100%;
    max-width: calc(100vw - 56px);
    height: 50vh;
    margin-bottom: 50vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    color: var(--background-color);
    font-size: 4vw;
    font-weight: bold;
`;

const InfoLayout = styled.div`
    width: auto;
    padding: 3vh 2vw;
    margin-bottom: 60vh;

    font-size: 24px;
    background-color: var(--background-color);

    > div {
        width: 85vw;
    }
`;

const Title = styled.span`
    display: block;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const Footer = styled.footer`
    width: auto;
    padding: 5vh;
    display: flex;
    justify-content: center;

    font-size: 24px;
    background-color: var(--auxiliary-elements-color);

    > span {
        width: fit-content;
    }
`;

const HomePage = () => {
    useEffect(() => {
        document.title = lang["Pages"].Home;
    }, []);
    
    return (
    <Layout>
        <Background>
            <SiteTitle>{lang.SiteTitle}</SiteTitle>
            <InfoLayout>
                <Title>Коротка інформація</Title>
                <div>Робота виконана студентом Снігуром Павлом з групи ІС-12.</div>

                <div style={{margin: "3vh 0", fontWeight: "bold"}}>Тема: "24. Облік талонів на проїзд в автобусному парку"</div>
                <div>Талон надає пасажиру право на проїзд, тому при собівартості в долю копійки він
                реалізується як мінімум за півтори гривні.</div>
                <div>Талони надходять на склад автобусного парку (АП) з типографії. Головний касир
                автобусного парку отримує їх на складі та видає касирам (приблизно 40 чоловік). Касир
                щодня видає певну кількість талонів кондуктору (всього їх біля 300 чоловік, по кількості
                автобусів). У кінці зміни кондуктор здає касиру виручку і залишок талонів. Розрахунки з
                кондуктором контролюються первинним документом Контрольний лист.</div>
                <div>Касир здає виручку головному касиру. Після цього виручка здається в банк (інкасується), і
                гроші надходять на рахунок АП. Починаючи з видачі талонів касирам, процес повторюється
                щодня, при позмінній роботі кондукторів видача їм талонів і приймання від них виручки
                відбувається двічі на день.</div>
                <div>Оскільки в контрольному листі відомо, на якому маршруті працював кондуктор, для аналізу
                перевезень становлять інтерес щоденні доходи від продажу талонів по маршрутах.</div>
            </InfoLayout>
            <InfoLayout>
                <Title>Технології</Title>
                <div>Технології, що використовуються для створення роботи:</div>
                <div style={{width: "100%", display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
                    <Technologies name="TypeScript" img={TS} link="https://www.typescriptlang.org/" />
                    <Technologies name="React" img={React} link="https://uk.legacy.reactjs.org/" />
                    <Technologies name="C#" img={Csharp} />
                    <Technologies name="Neo4j" img={Neo4j} link="https://neo4j.com/" />
                </div>
            </InfoLayout>

            <Footer>
                <span>Поставте 100, будь-ласка!</span>
            </Footer>
        </Background>
    </Layout>
    );
};

export default HomePage;
