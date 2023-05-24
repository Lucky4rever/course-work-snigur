import React, {Component} from "react";
import styled from "styled-components";
import Input from "./Input";
import { Route } from "../../helpers/types";
import { customRequest } from "../../helpers/Neo4jDriver";
import { Integer } from "neo4j-driver";

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

export default class RouteForm extends Component<Route> {
  constructor(props: Route) {
    super(props);
    this.state = {
      number: props.number as Integer,
      name: props.name
    };
  }
  
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { ...this.state };

    customRequest(`CREATE (:Route{number: ${(formData as Route).number}, name: '${(formData as Route).name}'})`);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <FormLayout onSubmit={this.handleSubmit}>
        <Input text="Номер:" name="number" onChange={this.handleChange} />
        <Input text="Назва:" name="name" onChange={this.handleChange} />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormLayout>
    );
  }
};
