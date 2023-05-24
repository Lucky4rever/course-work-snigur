import React, {Component} from "react";
import styled from "styled-components";
import Input from "./Input";

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

class ModalForm extends Component {

  // handleSubmit = (event: { preventDefault: () => void; }) => {
  //   event.preventDefault();
  //   // const { name, email, message } = this.state;
  // }
  handleSubmit = (data: Record<string, any>) => {
    console.log(data);
  };

  render() {
    return (
      <FormLayout onSubmit={this.handleSubmit}>
        <Input text="Name:" type="text" name="name" value={undefined} />
        <Input text="Email:" type="email" name="email" value={undefined} />
        <Input text="Message:" name="message" value={undefined} />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormLayout>
    );
  }
};

export default ModalForm;