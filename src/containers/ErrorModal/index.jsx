import React from 'react';
import { Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hideModal } from './redux/actions';

const ErrorModal = props => {
  const toggle = () => props.hideModal();

  const { show, error } = props;

  return (
    <div>
      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>Error</ModalHeader>
        <ModalBody>
          <Alert color="danger">{error}</Alert>
        </ModalBody>
      </Modal>
    </div>
  );
};

ErrorModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

export default connect(
  ({ errorModal }) => ({
    show: errorModal.show,
    error: errorModal.error
  }),
  { hideModal }
)(ErrorModal);
