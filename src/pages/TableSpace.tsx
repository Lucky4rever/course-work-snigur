import styled from "styled-components";
import { 
    CashierTable, 
    RouteTable,
    ChiefCashierTable, 
    ConductorTable, 
    ChecklistTable, 
    EmploeeTable, 
    ExternalDisbursementCashOrderTable, 
    InternalDisbursementCashOrderTable 
} from "../components/ContextTables";
import { ua as lang } from "../assets/langs/index";
import { useEffect } from "react";

const Title = styled.span`
    display: block;
    font-size: 36px;
    font-weight: bold;
    margin: 0 20px 20px;
`;

const Description = styled.span`
    display: block;
    font-size: 28px;
    margin: 0 20px 20px;
`;

const WorkspaceLayout = styled.div`
    box-sizing: border-box;
    /* position: static; */
    width: 100%;
    height: 100%;
    padding: 20px;
`;

interface WorkspaceProps {
    context: "Cashiers" | "ChiefCashiers" | "Conductors" | "Routes" | "Checklists" | "Emploees" | "InternalDisbursementCashOrderTable" | "ExternalDisbursementCashOrderTable"
}

type ContextTableProps = Record<string, JSX.Element>;
const ContextTable: ContextTableProps = {
    "Cashiers": <CashierTable />,
    "ChiefCashiers": <ChiefCashierTable />,
    "Conductors": <ConductorTable />,
    "Routes": <RouteTable />,
    "Checklists": <ChecklistTable />,
    "Emploees": <EmploeeTable />,
    "InternalDisbursementCashOrderTable": <InternalDisbursementCashOrderTable />,
    "ExternalDisbursementCashOrderTable": <ExternalDisbursementCashOrderTable />
}

const TableSpace = ({context}: WorkspaceProps) => {
    useEffect(() => {
        document.title = lang["Pages"].Table;
    }, []);

    return (
        <WorkspaceLayout id="context-table">
            <Title>{lang[context].title}</Title>
            <Description>{lang[context].description}</Description>
            {ContextTable[context]}
        </WorkspaceLayout>
    )
}

export default TableSpace;