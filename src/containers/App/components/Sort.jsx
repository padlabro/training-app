/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import { css } from "emotion";
import { connect } from "react-redux";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import { handleNewTraining } from "../Redux/actions";

const Sort = props => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <div
      className={css`
	max-width 500px;
	margin-bottom:10px;
	grid-area:sort;
  `}
    >
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Sort by: {props.sortBy.text}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem name="date" id="decrease" onClick={props.sortData}>
            New first
          </DropdownItem>
          <DropdownItem name="date" id="increase" onClick={props.sortData}>
            Old first
          </DropdownItem>
          <DropdownItem name="distance" id="increase" onClick={props.sortData}>
            Ascending distance
          </DropdownItem>
          <DropdownItem name="distance" id="decrease" onClick={props.sortData}>
            Descending distance
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
      <Button
        onClick={props.handleNewTraining}
        className={css`
          margin-left: 10px !important;
        `}
        outline
        color="secondary"
      >
        Add new training
      </Button>
    </div>
  );
};

export default connect(null, { handleNewTraining })(Sort);
