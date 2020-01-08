import React, { useState } from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { handleNewTraining } from '../Redux/actions';

const Sort = props => {
  const { sortData, sortBy, children } = props;

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <div
      className={css`
	max-width 500px;
	grid-area:sort;
  `}
    >
      <ButtonDropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        className={css`
          margin-right: 10px !important;
          vertical-align: top;
        `}
      >
        <DropdownToggle caret>Sort by: {sortBy.text}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem name="date" id="decrease" onClick={sortData}>
            New first
          </DropdownItem>
          <DropdownItem name="date" id="increase" onClick={sortData}>
            Old first
          </DropdownItem>
          <DropdownItem name="distance" id="increase" onClick={sortData}>
            Ascending distance
          </DropdownItem>
          <DropdownItem name="distance" id="decrease" onClick={sortData}>
            Descending distance
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
      <Button
        className={css`
          margin-right: 30px !important;
          vertical-align: top;
        `}
        onClick={props.handleNewTraining}
        outline
        color="secondary"
      >
        Add new training
      </Button>
      {children}
    </div>
  );
};

Sort.propTypes = {
  sortData: PropTypes.func.isRequired,
  sortBy: PropTypes.object.isRequired,
  children: PropTypes.object,
  handleNewTraining: PropTypes.func.isRequired
};
Sort.defaultProps = {
  children: undefined
};

export default connect(null, { handleNewTraining })(Sort);
