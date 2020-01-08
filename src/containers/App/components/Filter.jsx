import React from 'react';
import { CustomInput, Form, FormGroup, Label, Button } from 'reactstrap';
import { css } from 'emotion';
import PropTypes from 'prop-types';

const Filter = props => {
  const { handleFilterChange, handleSubmit } = props;
  return (
    <Form
      onSubmit={handleSubmit}
      className={css`
        grid-area: options;
      `}
    >
      <FormGroup>
        <Label for="exampleCheckbox">Filter</Label>
        <div>
          <CustomInput
            onChange={handleFilterChange}
            name="Running"
            type="checkbox"
            id="exampleCustomCheckbox"
            label="Running"
          />
          <CustomInput
            onChange={handleFilterChange}
            type="checkbox"
            id="exampleCustomCheckbox2"
            label="Riding a bike"
            name="Riding a bike"
          />
          <CustomInput
            onChange={handleFilterChange}
            type="checkbox"
            id="exampleCustomCheckbox3"
            label="Skiing"
            name="Skiing"
          />
          <CustomInput
            onChange={handleFilterChange}
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

Filter.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Filter;
