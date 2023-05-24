import React from "react";
import { Table, TableTitle, TableResult, TableRow } from "./ContextTable";
import styled from "styled-components";
import { ContextTable, Message } from "..";
import { getEmploees } from "../../helpers/Neo4jDriver";
import { Emploee } from "../../helpers/types";
import RowDeleteButton from "./RowDeleteButton";
import { RowAddModal } from "../Modal";
import EmploeeForm from "../Modal/EmploeeForm";

const CashierTableRow = styled(TableRow)`
  grid-template-columns: 65% calc(35% - 70px) 70px;
`;
const CashierTableTitle = styled(TableTitle)`
  grid-template-columns: 65% calc(35% - 70px) 70px;
`;

interface StateProps {
  rows: JSX.Element[];
  isLoaded: boolean;
};

class EmploeeTable extends ContextTable {
  state: StateProps = { 
    rows: [],
    isLoaded: false 
  };

  ContextTableRow: React.FC<Emploee> = ({ name, position }) => {
    return (
      <>
        <div>{name}</div>
        <div>{position}</div>
        <RowDeleteButton request={` MATCH (n{name: "${name}", position: "${position}"}) DETACH DELETE n `} />
      </>
    );
  }
  
  AllItems = async () => {
    const items = await getEmploees();
    return items.map((props, idx) => {
      return <CashierTableRow key={idx}><this.ContextTableRow name={props.name} position={props.position} /></CashierTableRow>;
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
    // const modal = super.render();
    const { rows, isLoaded } = this.state;
    return (
    !isLoaded ? (
      <Message title="Завантаження..." text="Зачекайте, поки не завантажаться усі дані" />
      ) : rows.length === 0 ? (
      <Message title="Тут пусто" text="Схоже, тут немає ніяких даних" />
      ) : (
        <>
          <Table>
            <CashierTableTitle>
              <div>ПІБ</div>
              <div>Посада</div>
            </CashierTableTitle>
              {rows}
            <TableResult>Showed {rows.length} rows</TableResult>
          </Table>
          <RowAddModal title="Працівники">
            <EmploeeForm name={""} position={""} />
          </RowAddModal>
        </>
      )
    )
  }
};

export default EmploeeTable;