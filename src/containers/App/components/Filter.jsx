/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { CustomInput, Form, FormGroup, Label, Button } from "reactstrap";
import { css } from "emotion";

const Filter = props => {
  return (
    <Form
      onSubmit={props.handleSubmit}
      className={css`
        grid-area: options;
      `}
    >
      <FormGroup>
        <Label for="exampleCheckbox">Filter</Label>
        <div>
          <CustomInput
            onChange={props.handleFilterChange}
            name="Running"
            type="checkbox"
            id="exampleCustomCheckbox"
            label="Running"
          />
          <CustomInput
            onChange={props.handleFilterChange}
            type="checkbox"
            id="exampleCustomCheckbox2"
            label="Riding a bike"
            name="Riding a bike"
          />
          <CustomInput
            onChange={props.handleFilterChange}
            type="checkbox"
            id="exampleCustomCheckbox3"
            label="Skiing"
            name="Skiing"
          />
          <CustomInput
            onChange={props.handleFilterChange}
            type="checkbox"
            id="exampleCustomCheckbox4"
            label="Walking"
            name="Walking"
          />
        </div>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

export default Filter;
