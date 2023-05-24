import React, {Component} from "react";
import styled from "styled-components";
import Input from "./Input";
import { Checklist } from "../../helpers/types";
import { customRequest } from "../../helpers/Neo4jDriver";
import { Integer, Date } from "neo4j-driver";

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

export default class ChecklistForm extends Component<Checklist> {
  constructor(props: Checklist) {
    super(props);
    this.state = {
      date: props.date,
      conductor: props.conductor,
      route: props.route,
      issuedCoupons: props.issuedCoupons,
      returnedCoupons: props.returnedCoupons,
      cashier: props.cashier
    };
  }
  
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { ...this.state };
    
    customRequest(`
      WITH ${(formData as Checklist).date} AS totalDate, ${(formData as Checklist).issuedCoupons} AS totalIssuedCoupons, ${(formData as Checklist).returnedCoupons} AS totalReturnedCoupons, "${(formData as Checklist).conductor}" AS totalConductorName, ${(formData as Checklist).route} AS totalRouteNumber, "${(formData as Checklist).cashier}" AS totalCashierName

      WITH totalDate, totalIssuedCoupons, totalReturnedCoupons, 8*(totalIssuedCoupons - totalReturnedCoupons) AS totalReceipts, totalConductorName, totalRouteNumber, totalCashierName
      
      MATCH (conductor:Conductor{name: totalConductorName})
      MATCH (route:Route{number: totalRouteNumber})
      MATCH (cashier:Cashier{name: totalCashierName})
      
      CREATE (checkList:Checklist{date: totalDate, issuedCoupons: totalIssuedCoupons, returnedCoupons: totalReturnedCoupons, receipts: totalReceipts})
      MERGE (checkList)-[:Conductor]->(conductor)
      MERGE (checkList)-[:Route]->(route)
      MERGE (cashier)<-[:Transfer]-(checkList)
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
        <Input text="Кондуктор:" name="conductor" onChange={this.handleChange} />
        <Input text="Маршрут:" name="route" onChange={this.handleChange} />
        <Input text="Видані квитки:" name="issuedCoupons" onChange={this.handleChange} />
        <Input text="Повернені квитки:" name="returnedCoupons" onChange={this.handleChange} />
        <Input text="Касир:" name="cashier" onChange={this.handleChange} />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormLayout>
    );
  }
};
