import React, { Component, MouseEventHandler } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { SubmitButton } from './ModalForm';

const RoundButtonLayout = styled.button`
  position: sticky;
  bottom: 40px;
  left: calc(100% - 40px);
  width: 60px;
  height: 60px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  display: flex;
  justify-content: center;

  border: none;
  background-color: var(--workspace-secondary-color);
  user-select: none;
  overflow: hidden;
  
  > span {
    width: fit-content;
    height: fit-content;
    margin-top: -8px;

    font-size: 64px;
    color: var(--background-color);
  }
`;

const CloseButton = styled(SubmitButton)`
  right: 150px !important;
  :is(:active, :hover, :active) {
    background-color: #00980F !important;
}
`;

const ModalTitle = styled.span`
    font-size: 28px;
    font-weight: bold;
`;

interface AddButtonProps<T> {
    onClick?: MouseEventHandler<T> | undefined
}

const RowAddButton = ({onClick}:AddButtonProps<HTMLElement>) => {
  return (<RoundButtonLayout onClick={onClick}><span>+</span></RoundButtonLayout>);
};

interface ModalWindowProps {
  children?: React.ReactNode;
  title?: string;
}

interface ModalWindowState {
  isOpen: boolean;
}

Modal.setAppElement("#root");

class RowAddModal extends Component<ModalWindowProps, ModalWindowState> {
  constructor(props: ModalWindowProps) {
    super(props);
    this.state = {
        isOpen: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ isOpen: true });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;
    const { children, title } = this.props;
    return (
      <>
        <RowAddButton onClick={this.handleOpenModal} />
        <Modal
          isOpen={isOpen}
          onRequestClose={this.handleCloseModal}
        >
          <ModalTitle>{title ?? "Новий рядок"}</ModalTitle>
          <hr />
          {children}
          <CloseButton onClick={this.handleCloseModal}>Закрити</CloseButton>
        </Modal>
      </>
    );
  }
}

export default RowAddModal;
