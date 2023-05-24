import React from "react";
import { Table, TableTitle, TableResult, TableRow } from "./ContextTable";
import styled from "styled-components";
import { ContextTable, Message } from "..";
import { getRoutes } from "../../helpers/Neo4jDriver";
import { Route } from "../../helpers/types";
import RowDeleteButton from "./RowDeleteButton";
import { RowAddModal, ContextForm, Input } from "../Modal";
import RouteForm from "../Modal/RouteForm";
import { Integer } from "neo4j-driver";

const RouteTableRow = styled(TableRow)`
grid-template-columns: 25% calc(75% - 70px) 70px;
`;
const RouteTableTitle = styled(TableTitle)`
  grid-template-columns: 25% calc(75% - 70px) 70px;
`;

interface StateProps {
  rows: JSX.Element[];
  isLoaded: boolean;
};

class RouteTable extends ContextTable {
  state: StateProps = { 
    rows: [],
    isLoaded: false 
  };

  ContextTableRow: React.FC<Route> = ({ number, name }) => {
    return (
      <>
        <div>{number.low}</div>
        <div>{name}</div>
        <RowDeleteButton request={` MATCH (n{number: ${number}, name: '${name}'}) DETACH DELETE n `} />
      </>
    );
  }
  
  AllItems = async () => {
    const items = await getRoutes();
    return items.map((props, idx) => {
      return <RouteTableRow key={idx}><this.ContextTableRow number={props.number} name={props.name} /></RouteTableRow>;
    });
  };

  async componentDidMount() {
    const cashiers = await this.AllItems();
    this.setState({ rows: cashiers, isLoaded: true });
  }

  async componentDidUpdate() {
    const cashiers = await this.AllItems();
    this.setState({ rows: cashiers, isLoaded: true });
  }

  render() {
    const { rows, isLoaded } = this.state;
    return !isLoaded ? (
      <Message title="Завантаження..." text="Зачекайте, поки не завантажаться усі дані" />
      ) : rows.length === 0 ? (
      <Message title="Тут пусто" text="Схоже, тут немає ніяких даних" />
      ) : (
        <>
          <Table>
            <RouteTableTitle>
              <div>Номер</div>
              <div>Назва</div>
            </RouteTableTitle>
              {rows}
            <TableResult>Showed {rows.length} rows</TableResult>
          </Table>
          <RowAddModal title="Маршрути">
            <RouteForm number={new Integer()} name={""} />
          </RowAddModal>
        </>
    );
  }
};

export default RouteTable;