import React from "react";
import styled from "styled-components";
import { SubmitButton } from "./ModalForm";
import Input from "./Input";

const FormLayout = styled.form`
  box-sizing: border-box;
  width: 96%;
  margin: 10px 2%;
`;

interface FormProps {
  onSubmit?: (data: Record<string, any>) => void;
  onInputChange?: (data: Record<string, any>) => void;
  children?: React.ReactNode;
}

interface FormData {
  [key: string]: any;
}
  
export default class ContextForm extends React.Component<FormProps, FormData> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
      year: "",
      position: "",
    };
  }
  
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: FormData = {};

    React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child) && child.type === "input") {
        const input = child.props;
        formData[input.name] = input.value;
      }
        console.log(child)
    });

    if (this.props.onSubmit !== undefined) {
      this.props.onSubmit(formData);
    }
  };

  render() {
    const { onInputChange } = this.props;

    return (
    <FormLayout onSubmit={this.handleSubmit}>
      {React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        const { name, value, text, type } = child.props;
        console.log(this.state);

        return React.createElement(Input, {
          ...child.props,
          onInputChange,
          value: this.state[name] ?? null,
          text: text,
          name: name,
          type: type
        });
      }
      return child;
    })}
      <SubmitButton type="submit">Зберегти</SubmitButton>
    </FormLayout>
    );
  }
}