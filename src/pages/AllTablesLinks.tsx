import styled from "styled-components";
import { CustomButton } from "../components";
import { ua as lang } from "../assets/langs/index";
import { useEffect } from "react";

const PageLayout = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-content: flex-start;

    @media screen and (min-width: 1344px) {
        max-width: calc(100vw - 86px);
        flex-flow: row wrap;
    }
`;

const LinkLayout = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 96%;
    min-width: calc(550px);
    margin: 2%;
    padding: 30px 30px 60px;

    border-radius: 15px;
    background-color: var(--workspace-primarly-color);

    @media screen and (min-width: 1344px) {
        width: 46%;
    }
`;

const Title = styled.span`
    display: block;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
`;

interface LinkProps { 
  type: "Cashiers" | "ChiefCashiers" | "Conductors" | "Routes" | "Checklists" | "Emploees" | "InternalDisbursementCashOrderTable" | "ExternalDisbursementCashOrderTable";
  href: string;
}
const AllLinks: LinkProps[] = [
  { type: "Emploees", href: "emploees/" },
  { type: "ChiefCashiers", href: "chief-cashiers/" },
  { type: "Cashiers", href: "cashiers/" },
  { type: "Conductors", href: "conductors/" },
  { type: "Routes", href: "routes/" },
  { type: "Checklists", href: "checklists/" },
  { type: "InternalDisbursementCashOrderTable", href: "internal-dco/" },
  { type: "ExternalDisbursementCashOrderTable", href: "external-dco/" }
]

const AllTablesLinks = () => {
  useEffect(() => {
    document.title = lang["Pages"].Lists;
  }, []);

  return (
    <PageLayout>
    {AllLinks.map((link, idx) =>{
      return (
        <LinkLayout key={idx}>
          <Title>{lang[link.type].title}</Title>
          {lang[link.type].description}
          <CustomButton href={link.href}>Перейти...</CustomButton>
        </LinkLayout>
      )
    })}
    </PageLayout>
  );
};

export default AllTablesLinks;
