import React from "react";
import { Table, TableTitle, TableResult, TableRow } from "./ContextTable";
import styled from "styled-components";
import { ContextTable, Message } from "..";
import { getChecklists } from "../../helpers/Neo4jDriver";
import { Checklist } from "../../helpers/types";
import RowDeleteButton from "./RowDeleteButton";
import { RowAddModal } from "../Modal";
import ChecklistForm from "../Modal/ChecklistForm";
import { Integer, Date } from "neo4j-driver";

const CashierTableRow = styled(TableRow)`
grid-template-columns: 10% 20% 20% 12% 12% 10% calc(16% - 70px) 70px;
`;
const CashierTableTitle = styled(TableTitle)`
  grid-template-columns: 10% 20% 20% 12% 12% 10% calc(16% - 70px) 70px;
`;

interface StateProps {
  rows: JSX.Element[];
  isLoaded: boolean;
};

class ConductorTable extends ContextTable {
  state: StateProps = { 
    rows: [],
    isLoaded: false 
  };

  ContextTableRow: React.FC<Checklist> = ({ date, conductor, route, issuedCoupons, returnedCoupons, receipts, cashier: casher }) => {
    return (
      <>
        <div>{date.toString()}</div>
        <div>{conductor}</div>
        <div>{route}</div>
        <div>{issuedCoupons.low}</div>
        <div>{returnedCoupons.low}</div>
        <div>{receipts}</div>
        <div>{casher}</div>
        <RowDeleteButton request={` MATCH ((n{date: ${date}, issuedCoupons: ${issuedCoupons}, returnedCoupons: ${returnedCoupons}, receipts: ${receipts}}) DETACH DELETE n `} />
      </>
    );
  }
  
  AllItems = async () => {
    const items = await getChecklists();
    return items.map((props, idx) => {
      return <CashierTableRow key={idx}>
        <this.ContextTableRow 
          date={props.date}
          conductor={props.conductor} 
          route={props.route}
          issuedCoupons={props.issuedCoupons} 
          returnedCoupons={props.returnedCoupons}
          receipts={props.receipts} 
          cashier={props.cashier} 
      /></CashierTableRow>;
    });
  };

  async componentDidMount() {
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
          <CashierTableTitle>
            <div>Дата</div>
            <div>Кондуктор</div>
            <div>Маршрут</div>
            <div>Видані квитки</div>
            <div>Повернені квитки</div>
            <div>Прибуток</div>
            <div>Касир</div>
          </CashierTableTitle>
            {rows}
          <TableResult>Showed {rows.length} rows</TableResult>
        </Table>
        <RowAddModal title="Контрольні листи">
          <ChecklistForm date={new Date<Integer>(new Integer(1), new Integer(1), new Integer(1))} conductor={""} route={""} issuedCoupons={new Integer()} returnedCoupons={new Integer()} receipts={0} cashier={""} />
        </RowAddModal>
      </>
    );
  }
};

export default ConductorTable;