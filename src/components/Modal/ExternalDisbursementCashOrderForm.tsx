import React, {Component} from "react";
import styled from "styled-components";
import Input from "./Input";
import { DisbursementCashOrder } from "../../helpers/types";
import { customRequest } from "../../helpers/Neo4jDriver";

const FormLayout = styled.form`
  box-sizing: border-box;
  width: 96%;
  margin: 10px 2%;
`;

export const SubmitButton = styled.button`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  border: none !important;
  background: none !important;
  color: #EEFFF0 !important;
  border-radius: 10px;
  text-decoration: none;
  user-select: none;

  > span {
      width: fit-content;
      height: fit-content;
  }

  :is(:active, :hover, :active) {
      background-color: #00980F !important;
  }
`;

export default class ExternalDisbursementCashOrderForm extends Component<DisbursementCashOrder> {
  constructor(props: DisbursementCashOrder) {
    super(props);
    this.state = {
      date: props.date,
      sum: props.sum,
      basis: props.basis,
      sender: props.sender,
      receiver: props.receiver,
      destinationCode: props.destinationCode,
      analyticalAccountingCode: props.analyticalAccountingCode,
      correspondingAccount: props.correspondingAccount,
      EDRPOU: props.EDRPOU
    };
  }
  
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { ...this.state } as DisbursementCashOrder;
    
    customRequest(`
      WITH ${formData.date} as totalDate
      MATCH (cc:ChiefCashier{name: "${formData.sender}", position: "головний касир"})
      
      MATCH (cc)-[:Transfer]->(:Conductor)<-[:Conductor]-(:Checklist)-[:Transfer]->(cs:Cashier{position: "касир"})
      WITH collect(cs.name) AS cashierNames, totalDate, cc

      MATCH (cs:Cashier{position: "касир"})<-[:Transfer]-(checklist:Checklist{date: totalDate})
      WHERE cs.name IN cashierNames

      WITH sum(checklist.receipts) AS sum, cs, cc, totalDate

      CREATE (cs)<-(:Cashier)-(dco:DisbursementCashOrder{sum: sum, basis: ("Прибуток за " + toString(totalDate) + " від кондуктора " + cs.name), date: totalDate, EDRPOU: "0084305771", correspondingAccount: "30", destinationCode: "", analyticalAccountingCode: ""})-[:Transfer]->(cc)
    `);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <FormLayout onSubmit={this.handleSubmit}>
        <Input text="Дата:" name="date" type="date" onChange={this.handleChange} />
        <Input text="Сума:" name="sum" onChange={this.handleChange} />
        <Input text="Підстава:" name="basis" onChange={this.handleChange} />
        <Input text="Відправник:" name="chiefCashier" onChange={this.handleChange} />
        <Input text="Отримувач:" name="collector" onChange={this.handleChange} />
        <Input text="Код цільового призначення:" name="destinationCode" onChange={this.handleChange} />
        <Input text="Код аналітичного рахунку:" name="destinationCode" onChange={this.handleChange} />
        <Input text="Кореспондуючий рахунок, субрахунок:" name="correspondingAccount" onChange={this.handleChange} />
        <Input text="Код ЄДРПОУ:" name="EDRPOU" onChange={this.handleChange} />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormLayout>
    );
  }
};
