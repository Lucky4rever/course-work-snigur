import styled from "styled-components";

const StyledLabel = styled.label`
  display: flex;
  width: 100%;
  margin: 12px 0;
  justify-content: space-between;
  align-items: center;

  > input {
    width: 70%;
    border: 1px solid #BDBDBD;
    padding: 3px 6px;
    border-radius: 5px;

    :focus, :active {
      outline: 1px solid #BDBDBD;
    }
  }
`;

// interface InputProps {
//   text?: string;
//   name: string;
//   value?: any;
//   onChange: (fieldName: string, fieldValue: any) => void;
//   type?: string;
// }
type InputProps = React.HTMLAttributes<HTMLElement> & {
  text?: string;
  name: string;
  type?: string;
  value?: any;
};

const Input = ({text, name, type, value, onChange}: InputProps) => {
  return (
    <StyledLabel>
      {text ?? ""}
      <input value={value} type={type} name={name} onChange={onChange} />
    </StyledLabel>
  )
}

export default Input;