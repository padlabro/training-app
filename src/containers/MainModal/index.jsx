import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import { hideModal } from './redux/actions';
import ModalForm from './container/ModalForm';

const MainModal = props => {
  const { show, id, data, children } = props;
  return (
    <div>
      <Modal isOpen={show} toggle={props.hideModal}>
        <ModalHeader toggle={props.hideModal}>
          {id ? 'Edit training' : 'Add new training'}
        </ModalHeader>
        <ModalBody>
          <ModalForm data={id ? data[id] : {}} />
        </ModalBody>
        <ModalFooter
          className={css`
            padding-right: 45%;
          `}
        >
          {children}
        </ModalFooter>
      </Modal>
    </div>
  );
};
MainModal.propTypes = {
  show: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  id: PropTypes.number,
  data: PropTypes.array.isRequired,
  children: PropTypes.object
};
MainModal.defaultProps = {
  id: null,
  children: undefined
};

export default connect(
  ({ mainModal, table }) => ({
    show: mainModal.show,
    data: table.data,
    id: table.edit
  }),
  {
    hideModal
  }
)(MainModal);
