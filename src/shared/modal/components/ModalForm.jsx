/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Form
} from "reactstrap";

const ModalForm = props => {
  const { values, handleChange, handleSubmit, errors } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleDate">Date</Label>
        <Input
          type="date"
          name="date"
          id="exampleDate"
          value={values.date}
          onChange={handleChange}
          invalid={!!errors.date}
        />
        <FormFeedback>{errors.date}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Distance</Label>
        <Input
          type="number"
          name="distance"
          value={values.distance}
          onChange={handleChange}
          invalid={!!errors.distance}
        />
        <FormFeedback>{errors.distance}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Type of training</Label>
        <Input
          type="select"
          name="type"
          id="exampleSelect"
          value={values.type}
          onChange={handleChange}
        >
          <option>Running</option>
          <option>Riding a bike</option>
          <option>Skiing</option>
          <option>Walking</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Comment</Label>
        <Input
          type="textarea"
          name="comment"
          id="exampleText"
          value={values.comment}
          onChange={handleChange}
          invalid={errors.comment}
        />
        <FormFeedback>{errors.comment}</FormFeedback>
      </FormGroup>
      <Button color="primary" type="submit">
        {values.date ? "Save training" : "Add new training"}
      </Button>
    </Form>
  );
};

export default ModalForm;
