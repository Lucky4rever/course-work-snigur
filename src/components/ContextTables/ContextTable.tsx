import {Component} from "react";
import styled from "styled-components";

const Table = styled.div`
  width: 100%;
  min-width: 600px;
  display: flex;
  flex-direction: column;

  border-radius: 15px;
  background-color: #FFFFFF;
`;

const TableRow = styled.div`
  box-sizing: border-box;
  min-height: 50px;
  height: fit-content;
  margin: 0 30px;
  display: grid;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #00980F;
  font-size: 18px;

  > div {
    height: fit-content;
    margin: 10px;
  }
`;

const TableTitle = styled(TableRow)`
  width: 100% !important;
  margin: 10px 0px 0px !important;
  padding: 0 30px 5px;
  
  font-size: 20px;
  font-weight: bold;
  color: var(--auxiliary-elements-color);
  border-bottom: 2px solid var(--auxiliary-elements-color);
`;

const TableResult = styled.div`
  width: fit-content;
  margin: 10px 20px;
  
  font-size: 12px;
  font-weight: bold;
  color: var(--auxiliary-elements-color);
`;

interface StateProps {
  rows: JSX.Element[];
  isLoaded: boolean;
};

abstract class ContextTable extends Component {
  abstract state: StateProps

  abstract AllItems: () => {};

  // abstract DeleteObject: () => {};

  componentDidMount() {};

  render() {
    return <></>
  }
};

export type { StateProps };
export {
  ContextTable,
  Table,
  TableRow,
  TableTitle,
  TableResult
};