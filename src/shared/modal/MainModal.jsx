/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { hideModal } from "./redux/actions";
import ModalForm from "./container/ModalForm";

const ModalExample = props => {
  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.hideModal}>
        <ModalHeader toggle={props.hideModal}>
          {props.id ? "Edit training" : "Add new training"}
        </ModalHeader>
        <ModalBody>
          <ModalForm data={props.id ? props.data[props.id] : {}} />
        </ModalBody>
        <ModalFooter />
      </Modal>
    </div>
  );
};

export default connect(
  ({ modal, table }) => ({
    isOpen: modal.show,
    data: table.data,
    id: table.edit
  }),
  {
    hideModal
  }
)(ModalExample);
