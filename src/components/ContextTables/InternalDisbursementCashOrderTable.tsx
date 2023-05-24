import React from "react";
import { Table, TableTitle, TableResult, TableRow } from "./ContextTable";
import styled from "styled-components";
import { ContextTable, Message } from "..";
import { getInternalDisbursementCashOrders } from "../../helpers/Neo4jDriver";
import { DisbursementCashOrder } from "../../helpers/types";
import RowDeleteButton from "./RowDeleteButton";
import { RowAddModal, ContextForm, Input } from "../Modal";

const CashierTableRow = styled(TableRow)`
grid-template-columns: 7% 8% 25% 10% 10% 10% 10% 10% calc(10% - 70px) 70px;
`;
const CashierTableTitle = styled(TableTitle)`
grid-template-columns: 7% 8% 25% 10% 10% 10% 10% 10% calc(10% - 70px) 70px;
`;

interface StateProps {
  rows: JSX.Element[];
  isLoaded: boolean;
};

class InternalDisbursementCashOrderTable extends ContextTable {
  state: StateProps = { 
    rows: [],
    isLoaded: false 
  };

  ContextTableRow: React.FC<DisbursementCashOrder> = ({ date, sum, basis, sender, receiver, destinationCode, analyticalAccountingCode, correspondingAccount, EDRPOU }) => {
    return (
      <>
        <div>{date.toString()}</div>
        <div>{sum}</div>
        <div>{basis}</div>
        <div>{sender}</div>
        <div>{receiver}</div>
        <div>{destinationCode.length === 0 ? "-" : destinationCode}</div>
        <div>{analyticalAccountingCode.length === 0 ? "-" : analyticalAccountingCode}</div>
        <div>{correspondingAccount}</div>
        <div>{EDRPOU}</div>
        <RowDeleteButton request={` MATCH (n{sum: ${sum}, date: ${date}, EDRPOU: "${EDRPOU}", correspondingAccount: "${correspondingAccount}"}) DETACH DELETE n `} />
      </>
    );
  }
  
  AllItems = async () => {
    const items = await getInternalDisbursementCashOrders();
    return items.map((props, idx) => {
      return <CashierTableRow key={idx}>
        <this.ContextTableRow 
          date={props.date} 
          sum={props.sum} 
          basis={props.basis} 
          sender={props.sender} 
          receiver={props.receiver} 
          destinationCode={props.destinationCode} 
          analyticalAccountingCode={props.analyticalAccountingCode} 
          correspondingAccount={props.correspondingAccount} 
          EDRPOU={props.EDRPOU} 
        />
      </CashierTableRow>;
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
              <div>Дата складання</div>
              <div>Сума</div>
              <div>Підстава</div>
              <div>Відправник</div>
              <div>Отримувач</div>
              <div>Код цільового призначення</div>
              <div>Код аналітичного рахунку</div>
              <div>Кореспондуючий рахунок, субрахунок</div>
              <div>Код ЄДРПОУ</div>
            </CashierTableTitle>
              {rows}
            <TableResult>Showed {rows.length} rows</TableResult>
          </Table>
          <RowAddModal title="Видаткові касові ордери">
            <ContextForm onSubmit={()=>{console.log(123)}}>
              <Input text="Дата:" name="date" type="date" value={Date.now()} />
              <Input text="Сума:" name="sum" value={undefined} />
              <Input text="Підстава:" name="basis" value={undefined} />
              <Input text="Відправник:" name="chiefCashier" value={undefined} />
              <Input text="Отримувач:" name="collector" value={undefined} />
              <Input text="Код цільового призначення:" name="destinationCode" value={"-"} />
              <Input text="Код аналітичного рахунку:" name="destinationCode" value={"-"} />
              <Input text="Кореспондуючий рахунок, субрахунок:" name="correspondingAccount" value={30} />
              <Input text="Код ЄДРПОУ:" name="EDRPOU" value={undefined} />
            </ContextForm>
          </RowAddModal>
        </>
      );
  }
};

export default InternalDisbursementCashOrderTable;