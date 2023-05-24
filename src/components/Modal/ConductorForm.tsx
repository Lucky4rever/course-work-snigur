import React, {Component} from "react";
import styled from "styled-components";
import Input from "./Input";
import { Conductor } from "../../helpers/types";
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

export default class ConductorForm extends Component<Conductor> {
  constructor(props: Conductor) {
    super(props);
    this.state = {
      name: props.name,
      position: props.position
    };
  }
  
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = { ...this.state };

    customRequest(`CREATE (:Emploee:Conductor{name: '${(formData as Conductor).name}', position: '${(formData as Conductor).position}'})`);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <FormLayout onSubmit={this.handleSubmit}>
        <Input text="Ім'я:" type="text" name="name" onChange={this.handleChange} />
        <Input text="Посада:" name="position" onChange={this.handleChange} />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormLayout>
    );
  }
};
